import { LayoutDashboard } from '@/components/layouts/dashboard';
import { CreateOrUpdateFormMediaShop } from '@/components/shop/form/create-or-update-form-media-shop';
import { PrivateComponent } from '@/components/util/private-component';
import { useRouter } from 'next/router';

const ShopCreate = () => {
  const { query } = useRouter();
  const { tab } = query;

  return (
    <>
      <LayoutDashboard title={'New product'}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            {tab === 'media' ? <CreateOrUpdateFormMediaShop /> : null}
            {/* <CreateOrUpdateFormShop /> */}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ShopCreate);
