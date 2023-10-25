import { PrivateComponent } from "@/components/util/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { Image, Input } from "antd";
import { HorizontalNavShop } from "@/components/shop/horizontal-nav-shop";
import { ButtonInput } from "@/components/ui/button-input";
import { CreateOrUpdateFormShop } from "@/components/shop/create-or-update-form-shop";

const ShopCreate = () => {
  return (
    <>
      <LayoutDashboard title={"Articles create"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              
                <CreateOrUpdateFormShop />
                
              </div>

            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ShopCreate);
