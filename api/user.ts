import {
  UserLoginFormModel,
  UserRegisterFormModel,
  UserForgotPasswordFormModel,
  UserResetPasswordFormModel,
  UserModel,
  NextStep,
} from "@/types/user.type";
import { makeApiCall } from "@/utils/get-url-end-point";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const loginUserAPI = async (
  payload: UserLoginFormModel
): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: "loginUser",
    body: payload,
  });
};

export const passwordResetUserAPI = async (
  payload: UserForgotPasswordFormModel
): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: "passwordResetUser",
    body: payload,
  });
};

export const registerUserAPI = async (
  payload: UserRegisterFormModel
): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: "registerUser",
    body: payload,
  });
};

export const resetPasswordAPI = async (
  payload: UserResetPasswordFormModel
): Promise<{ data: UserModel }> => {
  const { newPassword, passwordConfirm, token } = payload;
  return await makeApiCall({
    action: "resetPassword",
    urlParams: { token },
    body: { password: newPassword, passwordConfirm },
  });
};

export const resendCodeAPI = async (payload: {
  userId: string;
}): Promise<{ data: UserModel }> => {
  const { userId } = payload;
  return await makeApiCall({
    action: "resendCode",
    urlParams: { userId },
  });
};

export const ValidCodeAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: {
      code: string;
      nextStep: NextStep;
    }): Promise<{ data: UserModel }> => {
      return await makeApiCall({
        action: "validCode",
        body: payload,
      });
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries();
        if (onSuccess) {
          onSuccess();
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries();
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: async (error: any) => {
        await queryClient.invalidateQueries();
        if (onError) {
          onError(error);
        }
      },
    }
  );

  return result;
};

export const GetOneUserPrivateAPI = (payload: { userId: string }) => {
  const { userId } = payload;
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () =>
      await makeApiCall({
        action: "getOneUserPrivate",
        urlParams: { userId },
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    enabled: Boolean(userId),
  });
};

export const GetOneUserPublicAPI = (payload: {
  userId?: string;
  username?: string;
}) => {
  const { userId, username } = payload;
  return useQuery({
    queryKey: ["user", userId, username],
    queryFn: async () =>
      await makeApiCall({
        action: "getOneUserPublic",
        queryParams: { userId, username },
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};
