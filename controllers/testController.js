export const testUserController = (req, res) => {
  try {
    res.status(200).send("<h1>test user dat</h1>");
  } catch (error) {
    console.log('Error in Test API', error);
  }
};
