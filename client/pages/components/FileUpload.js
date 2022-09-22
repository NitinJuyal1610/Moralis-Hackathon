import { Web3Storage } from "web3.storage";

function getAccessToken() {
  return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
}

export const FileUpload = async (selectedFile, user, fileType) => {
  let cid = await storeFiles(selectedFile);
  const url = `https://ipfs.io/ipfs/${cid}/${selectedFile[0].name}`;
  user.set(fileType, [url]);
  user.save();
  return url;
};
