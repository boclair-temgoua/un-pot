import { IconTypePost } from '@/utils/icon-type-post';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NavbarProps } from '../layouts/dashboard/vertical-nav-dashboard';

const classIcon = 'flex-shrink-0 w-8 h-8 text-gray-600 md:w-10 md:h-10';

const HorizontalNavCreateShop = () => {
  const router = useRouter();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: 'Image',
      href: `/shop/create?tab=media`,
      description: `142 Available Audio Posts`,
      icon: <IconTypePost type="GALLERY" className={classIcon} />,
    },
    {
      title: 'Audio',
      href: `/shop/create?tab=audio`,
      description: `142 Available Audio Posts`,
      icon: <IconTypePost type="AUDIO" className={classIcon} />,
    },
    {
      title: 'Other',
      href: `/shop/create?tab=other`,
      description: `142 Available Videos Posts`,
      icon: <IconTypePost type="VIDEO" className={classIcon} />,
    },
  ]);

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-8 xl:grid-cols-3 xl:gap-12">
        {navigation.map((item: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => router.push(item?.href)}
              className="cursor-pointer rounded-xl border border-gray-200 bg-white hover:-translate-y-1 dark:border-gray-800 dark:bg-[#121212]"
            >
              {/* <div className="p-6 lg:px-10 lg:py-8"> */}
              <div className="p-6 lg:px-6 lg:py-4">
                <div className="flex items-center justify-start space-x-3">
                  {item?.icon}
                  <>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white sm:text-base lg:text-lg">
                      {item?.title}
                    </h3>
                    {/* <p className="mt-2 text-sm font-medium text-gray-600">
                      {item?.description}
                    </p> */}
                  </>
                </div>
              </div>
              {/* </div> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export { HorizontalNavCreateShop };
