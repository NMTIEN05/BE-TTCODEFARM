import Category from "../models/Category.js";

// Lấy tất cả danh mục
export const getCategories = async (req, res) => {
  const { body } = req.body;
  try {
    const categories = await Category.find(body);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy danh mục" });
  }
};

// Lấy danh mục theo ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params.id;
  try {
    const category = await Category.findOne({ _id: id });
    if (!category)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy danh mục" });
  }
};

// Tạo mới danh mục
export const createCategory = async (req, res) => {
  const { body } = req.body;
  try {
    const newCategory = await new Category(body).save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: "Tạo danh mục thất bại", error });
  }
};

// Cập nhật danh mục bằng findOneAndUpdate
export const updateCategory = async (req, res) => {
  const { id } = req.params.id;
  try {
    const updated = await Category.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          updated_at: Date.now(),
        },
      },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Cập nhật thất bại", error });
  }
};

// Xóa danh mục bằng findOneAndDelete
export const deleteCategory = async (req, res) => {
  const { id } = req.params.id;
  try {
    const deleted = await Category.findOneAndDelete({ _id: id });
    if (!deleted)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    res.json({ message: "Xoá danh mục thành công" });
  } catch (error) {
    res.status(500).json({ message: "Xoá thất bại", error });
  }
};
