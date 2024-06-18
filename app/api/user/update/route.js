import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export const POST = async (req) => {
  await connectToDB();

  const { profileData } = await req.json();
  console.log('Profile Data:', profileData);

  if (!profileData) {
    return new Response(JSON.stringify({ error: 'Profile data is required' }), {
      status: 400,
    });
  }

  const { address, username, bio, profilePicture } = profileData;

  try {
    const result = await User.findOneAndUpdate(
      { address },
      { username, bio, profilePicture },
      { new: true }
    );

    if (!result) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, user: result }), {
      status: 200,
    });
    
  } catch (error) {
    console.error(error);
    return new Response(error, { status: 500 });
  }
};
