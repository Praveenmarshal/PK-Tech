const slugify = require("slugify");
const Resource = require("../models/Resource");

function makeSlug(title, slug) {
  return slug || slugify(title || "pktech-resource", { lower: true, strict: true });
}

async function listResources(req, res, next) {
  try {
    const resources = await Resource.find({ status: "Published" }).sort({ createdAt: -1 });
    res.json({ resources });
  } catch (error) {
    next(error);
  }
}

async function listAdminResources(req, res, next) {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json({ resources });
  } catch (error) {
    next(error);
  }
}

async function getResource(req, res, next) {
  try {
    const resource = await Resource.findOne({ slug: req.params.slug });
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json({ resource });
  } catch (error) {
    next(error);
  }
}

async function createResource(req, res, next) {
  try {
    const resource = await Resource.create({
      ...req.body,
      slug: makeSlug(req.body.title, req.body.slug),
      tags: Array.isArray(req.body.tags) ? req.body.tags : String(req.body.tags || "").split(",").map((item) => item.trim()).filter(Boolean)
    });
    res.status(201).json({ resource });
  } catch (error) {
    next(error);
  }
}

async function updateResource(req, res, next) {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json({ resource });
  } catch (error) {
    next(error);
  }
}

async function deleteResource(req, res, next) {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}

module.exports = { listResources, listAdminResources, getResource, createResource, updateResource, deleteResource };

