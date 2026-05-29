const slugify = require("slugify");
const Project = require("../models/Project");

function makeSlug(title, slug) {
  return slug || slugify(title || "zilist-project", { lower: true, strict: true });
}

async function listProjects(req, res, next) {
  try {
    const projects = await Project.find({ status: "Published" }).sort({ featured: -1, createdAt: -1 });
    res.json({ projects });
  } catch (error) {
    next(error);
  }
}

async function listAdminProjects(req, res, next) {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ projects });
  } catch (error) {
    next(error);
  }
}

async function getProject(req, res, next) {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ project });
  } catch (error) {
    next(error);
  }
}

async function createProject(req, res, next) {
  try {
    const project = await Project.create({
      ...req.body,
      slug: makeSlug(req.body.title, req.body.slug),
      technologies: Array.isArray(req.body.technologies) ? req.body.technologies : String(req.body.technologies || "").split(",").map((item) => item.trim()).filter(Boolean)
    });
    res.status(201).json({ project });
  } catch (error) {
    next(error);
  }
}

async function updateProject(req, res, next) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ project });
  } catch (error) {
    next(error);
  }
}

async function deleteProject(req, res, next) {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}

module.exports = { listProjects, listAdminProjects, getProject, createProject, updateProject, deleteProject };

