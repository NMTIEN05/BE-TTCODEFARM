import Author from "../models/Author.js";

// Lấy tất cả tác giả
export const getAuthors = async (req, res) => {
  const { body } = req.body;
  try {
    const authors = await Author.find(body);
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy tác giả" });
  }
};

// Lấy tác giả theo ID
export const getAuthorById = async (req, res) => {
  const { id } = req.params.id;
  try {
    const author = await Author.findOne({ _id: id });
    if (!author)
      return res.status(404).json({ message: "Không tìm thấy tác giả" });
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy tác giả" });
  }
};

// Tạo mới tác giả
export const createAuthor = async (req, res) => {
  const { body } = req.body;
  try {
    const newAuthor = await new Author(body).save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(400).json({ message: "Tạo tác giả thất bại", error });
  }
};

// Cập nhật tác giả bằng findOneAndUpdate
export const updateAuthor = async (req, res) => {
  const { id } = req.params.id;
  const { body } = req.body;
  try {
    const updated = await Author.findOneAndUpdate(
      { _id: id },
      {
        body,
      },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Không tìm thấy tác giả" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Cập nhật thất bại", error });
  }
};

// Xóa tác giả
export const deleteAuthor = async (req, res) => {
  const { id } = req.params.id;
  try {
    const deleted = await Author.findOneAndDelete({ _id: id });
    if (!deleted)
      return res.status(404).json({ message: "Không tìm thấy tác giả" });
    res.json({ message: "Xóa tác giả thành công" });
  } catch (error) {
    res.status(400).json({ message: "Xóa tác giả thất bại", error });
  }
};
