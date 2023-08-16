import UserCard from '@/components/cards/UserCard';
import { fetchAllUsers, fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const result = await fetchAllUsers({
    userId: user.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>

      <div className='mt-14 flex flex-col gap-9'>
        {result.users.length === 0 ? (
          <p className='no-result'>No users found...</p>
        ) : (
          <>
            {result.users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                imgUrl={user.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
export default Page;
