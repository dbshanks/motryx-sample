import dbConnect from '../../../utils/dbConnect';
import DataSet from '../../../Models/Data';

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const dataResult = await DataSet.findById(id);

        if (!dataResult) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: dataResult });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const dataResult = await DataSet.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!dataResult) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedData = await DataSet.deleteOne({ _id: id });
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
};
