import dbConnect from '@Utils/dbConnect';
import Data from '@Models/Data';

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
};

switch (method) {
  case 'GET':
    try {
      const data = await Data.findById(id);

      if (!data) {
        return res.status(400).json({ succees: false });
      }
      res.status(200).json({ succees: true, data: data });
    } catch (error) {
      res.status(400).json({ success: false });
      console.log(error);
    }
    break;
  case 'PUT':
    try {
      const data = await Data.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!data) {
        return res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: data });
    } catch (error) {
      res.status(400).json({ success: false });
      console.log(error);
    }
    break;
  case 'DELETE':
    try {
      const deletedData = await Data.deleteOne({ _id: id });
      if (!deletedData) {
        return res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(400).json({ success: false });
      console.log(error);
    }
    break;
  default:
    res.status(400).json({ success: false });
    break;
}
