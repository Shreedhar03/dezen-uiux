const { Readable } = require('stream');
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET);

export const POST = async (req) => {
  const data = await req.formData();
  const file = data.get('file');
  const fileType = file.type.split('/')[0];

  if (fileType !== 'image') {
    return new Response(
      JSON.stringify({ error: 'Only image files are allowed' }),
      { status: 400 }
    );
  }

  const fileName = file.name || '0xdefault';

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);

    const result = await pinata.pinFileToIPFS(readableStream, {
      pinataMetadata: {
        name: fileName
      }
    });

    if (result.IpfsHash) {
      return new Response(
        JSON.stringify({ success: true, hash: result.IpfsHash }),
        { status: 200 }
      );
    } else {
      throw new Error('Failed to upload to IPFS');
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response('Failed to upload file', { status: 500 });
  }
};
