import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export const POST = async (req) => {
  await connectToDB();

  const { address } = await req.json();
  console.log('User address:', address);

  if (!address) {
    return new Response(JSON.stringify({ error: 'Address is required' }), {
      status: 400,
    });
  }

  const defaultUser = {
    address: address,
    username: address.slice(0, 6),
    profilePicture: 'QmYggqtqetqc8ZWmnrpoTe343tEnNuofWeuQAcDoXmqRot'
  };

  try {
    const newUser = await User.create(defaultUser);

    return new Response(JSON.stringify({ success: true, user: newUser }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(error, { status: 500 });
  }
};
