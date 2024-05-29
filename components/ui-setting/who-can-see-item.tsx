import { cn } from '@/lib/utils';
import { ProductModel } from '@/types/product';
import { formatePrice } from '@/utils';
import { LockKeyholeIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { ButtonInput } from './button-input';

interface Props {
  profile: { color: string; username: string };
}

export const WhoCanSeeItem = ({ profile }: Props) => {
  const { push } = useRouter();

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <button className="font-bold">
            <LockKeyholeIcon className="size-10" />
          </button>
          {/* <p className="text-sm font-bold text-white">
            {' '}
            This post is for members only.{' '}
          </p> */}

          {/* <RedirectToMembershipsButton username={profile?.username} /> */}
        </div>
      </div>
    </>
  );
};

export const WhoCanSeeProductItem = ({
  product,
}: {
  product?: ProductModel;
}) => {
  const { push } = useRouter();

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="justify-center text-center text-white">
          <ButtonInput
            type="button"
            variant="link"
            size="sm"
            className="text-white"
            icon={<LockKeyholeIcon className="size-8" />}
          />
          <p className="text-xl font-bold text-white">
            {formatePrice({
              currency: `${product?.currency?.code}`,
              value: Number(product?.priceDiscount ?? 0),
              isDivide: false,
            })}
          </p>
          <p className="mt-2 text-sm font-bold text-white">
            Unlock {product?.tab.toLocaleLowerCase()}
          </p>
          {/* <RedirectToCheckoutButton
            //className="my-4"
            url={`/shop/`}
            title={`Unlock media`}
          /> */}
        </div>
      </div>
    </>
  );
};

export function RedirectToCheckoutButton(props: {
  className?: string;
  title?: string;
  url: string;
}) {
  const { className, title = 'Unlock', url } = props;
  const { push } = useRouter();

  return (
    <>
      <ButtonInput
        type="button"
        variant="primary"
        className={cn('mt-2 px-3', className)}
        onClick={() => push(url)}
        icon={<LockKeyholeIcon className="size-4" />}
      >
        <span className="ml-1"> {title}</span>
      </ButtonInput>
    </>
  );
}

export function RedirectToMembershipsButton(props: {
  className?: string;
  username: string;
}) {
  const { className, username } = props;
  const { push } = useRouter();

  return (
    <>
      <ButtonInput
        onClick={() => push(`/${username}/memberships`)}
        className={cn('mt-2', className)}
        type="button"
        variant="default"
        size="lg"
        icon={<LockKeyholeIcon className="mr-2 size-6" />}
      >
        Become a member
      </ButtonInput>
    </>
  );
}
