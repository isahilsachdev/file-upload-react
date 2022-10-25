// function to return a random number b/w 1-100 which we will consider as percentage of success

export const isUploadSuccess = () => {
  const num = Math.floor(Math.random() * 100)
  return num<= 75;
}