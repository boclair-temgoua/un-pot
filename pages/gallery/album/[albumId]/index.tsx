import { TableGallery } from '@/components/gallery/table-gallery';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { useRouter } from 'next/router';

const Albums = () => {
  const { organizationId, profile, userStorage: user } = useAuth() as any;
  const { query, push } = useRouter();
  const albumId = String(query?.albumId);

  return (
    <>
      <LayoutDashboard title={'Albums'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              {organizationId && albumId ? (
                <TableGallery
                  albumId={albumId}
                  organizationId={organizationId}
                />
              ) : null}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Albums);
