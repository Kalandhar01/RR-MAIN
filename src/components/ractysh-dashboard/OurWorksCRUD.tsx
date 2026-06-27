"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, Edit3, Trash2, Star, Loader2, ArrowLeft, Save, X, Upload,
  FolderKanban, Building2, HardHat, Home, Globe, Landmark, ChevronDown, ImageOff,
  Sparkles, LogOut, Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "architecture", label: "Architecture", icon: Building2 },
  { value: "construction", label: "Construction", icon: HardHat },
  { value: "real-estate", label: "Real Estate", icon: Home },
  { value: "import-export", label: "Import Export", icon: Globe },
  { value: "otc", label: "OTC", icon: Landmark },
];
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  architecture: Building2, construction: HardHat, "real-estate": Home,
  "import-export": Globe, otc: Landmark,
};
const CATEGORY_LABELS: Record<string, string> = {
  architecture: "Architecture", construction: "Construction",
  "real-estate": "Real Estate", "import-export": "Import Export", otc: "OTC",
};
const STATUS_STYLES: Record<string, string> = {
  Completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Ongoing: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Upcoming: "bg-blue-500/15 text-blue-400 border-blue-500/20",
};

type Work = {
  id?: string; _id?: string; title: string; slug: string;
  category: string; shortDescription?: string; description?: string;
  location: string; status: string; featured: boolean;
  coverImage: string; galleryImages?: string[];
  displayOrder?: number; seoTitle?: string; seoDescription?: string;
  createdAt: string; updatedAt?: string;
};

function slugify(v: string) {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 200);
}

const inputClass = "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#555] focus:border-[#D4AF37]/30";
const labelClass = "text-[11px] font-semibold uppercase tracking-wider text-[#555]";

function ProjectCard({ work, onEdit, onDelete, onToggleFeatured, deleting }: {
  work: Work; onEdit: () => void; onDelete: () => void;
  onToggleFeatured: () => void; deleting: boolean;
}) {
  const CatIcon: React.ElementType | null = CATEGORY_ICONS[work.category] || null;
  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <div className="flex gap-3 p-3">
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.03]">
          {work.coverImage ? (
            <img src={work.coverImage} alt="" className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="flex h-full items-center justify-center"><ImageOff className="h-5 w-5 text-[#444]" /></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-white truncate">{work.title}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                {CatIcon && React.createElement(CatIcon, { className: "h-3 w-3 text-[#888]" })}
                <span className="text-[11px] text-[#666]">
                  {CATEGORY_LABELS[work.category] || work.category}
                  {work.location ? ` · ${work.location}` : ""}
                </span>
              </div>
            </div>
            <span className={cn("shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider", STATUS_STYLES[work.status])}>
              {work.status}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button onClick={onToggleFeatured}
              className={cn("flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                work.featured ? "text-[#D4AF37]" : "text-[#444] hover:text-[#666]"
              )}>
              <Star className={cn("h-3.5 w-3.5", work.featured && "fill-current")} />
            </button>
            <button onClick={onEdit}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-[#555] hover:bg-white/[0.06] hover:text-white">
              <Edit3 className="h-3.5 w-3.5" />
            </button>
            <button onClick={onDelete} disabled={deleting}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-[#555] hover:bg-red-500/10 hover:text-red-400 disabled:opacity-30 ml-auto">
              {deleting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function RactyshOurWorks() {
  const [mode, setMode] = React.useState<"list" | "form">("list");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [works, setWorks] = React.useState<Work[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const [deleting, setDeleting] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const [form, setForm] = React.useState({
    title: "", slug: "", category: "architecture",
    shortDescription: "", description: "", location: "",
    status: "Ongoing", coverImage: "", galleryImages: [] as string[],
    featured: false, displayOrder: 0, seoTitle: "", seoDescription: "",
  });

  async function fetchWorks() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "50" });
      if (search) params.set("search", search);
      const res = await fetch(`/api/our-works?${params}`);
      const data = await res.json();
      if (data.works) setWorks(data.works);
    } catch { setError("Failed to load"); }
    finally { setLoading(false); }
  }

  React.useEffect(() => { fetchWorks(); }, []);

  function startEdit(work: Work) {
    setForm({
      title: work.title, slug: work.slug, category: work.category,
      shortDescription: work.shortDescription || "",
      description: work.description || "", location: work.location || "",
      status: work.status, coverImage: work.coverImage || "",
      galleryImages: work.galleryImages || [],
      featured: work.featured, displayOrder: work.displayOrder || 0,
      seoTitle: work.seoTitle || "", seoDescription: work.seoDescription || "",
    });
    setEditingId(work.id || work._id || null);
    setMode("form");
  }

  function startNew() {
    setForm({
      title: "", slug: "", category: "architecture",
      shortDescription: "", description: "", location: "",
      status: "Ongoing", coverImage: "", galleryImages: [],
      featured: false, displayOrder: 0, seoTitle: "", seoDescription: "",
    });
    setEditingId(null);
    setMode("form");
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({ ...prev, title, slug: editingId ? prev.slug : slugify(title) }));
  }

  async function uploadFile(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "ractysh-admin/our-works");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, coverImage: data.url }));
      }
    } catch { /* */ }
    finally { setUploading(false); }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const url = editingId ? `/api/our-works/${editingId}` : "/api/our-works";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = await res.json();
      if (result.error) { setError(result.error); return; }
      setMode("list");
      fetchWorks();
    } catch { setError("Failed to save"); }
    finally { setSaving(false); }
  }

  async function toggleFeatured(work: Work) {
    const id = work.id || work._id;
    setWorks((w) => w.map((x) => (x.id === id || x._id === id) ? { ...x, featured: !x.featured } : x));
    await fetch(`/api/our-works/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...work, featured: !work.featured }),
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/our-works/${id}`, { method: "DELETE" });
      fetchWorks();
    } catch { /* */ }
    finally { setDeleting(null); }
  }

  if (mode === "form") {
    return (
      <div className="min-h-screen bg-[#050505] text-white">
        <div className="max-w-lg mx-auto px-3 py-4">
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => setMode("list")}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#666] hover:bg-white/[0.06] hover:text-white">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h1 className="text-lg font-semibold">{editingId ? "Edit Project" : "New Project"}</h1>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">{error}</div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className={labelClass}>Title *</label>
              <input type="text" required value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Project title" className={cn(inputClass, "mt-1.5")} />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input type="text" value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
                className={cn(inputClass, "mt-1.5 text-[#888]")} />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className={labelClass}>Category</label>
                <select value={form.category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                  className={cn(inputClass, "mt-1.5 cursor-pointer")}>
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select value={form.status}
                  onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                  className={cn(inputClass, "mt-1.5 cursor-pointer")}>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input type="text" value={form.location}
                onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Dubai, UAE" className={cn(inputClass, "mt-1.5")} />
            </div>
            <div>
              <label className={labelClass}>Short Description</label>
              <input type="text" value={form.shortDescription}
                onChange={(e) => setForm((prev) => ({ ...prev, shortDescription: e.target.value }))}
                placeholder="Brief summary" className={cn(inputClass, "mt-1.5")} />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                rows={4} className={cn(inputClass, "mt-1.5 resize-none")} />
            </div>
            <div>
              <label className={labelClass}>Cover Image</label>
              <div className="mt-1.5 space-y-2">
                {form.coverImage ? (
                  <div className="relative rounded-xl border border-white/[0.06] overflow-hidden">
                    <img src={form.coverImage} alt="" className="h-28 w-full object-cover" />
                    <button type="button" onClick={() => setForm((prev) => ({ ...prev, coverImage: "" }))}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/[0.08] py-8 text-sm text-[#666] hover:border-[#D4AF37]/30 hover:text-[#D4AF37]">
                    {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
                    {uploading ? "Uploading..." : "Tap to upload cover"}
                    <input type="file" accept="image/*" className="hidden" disabled={uploading}
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); e.target.value = ""; }} />
                  </label>
                )}
                <input type="url" value={form.coverImage}
                  onChange={(e) => setForm((prev) => ({ ...prev, coverImage: e.target.value }))}
                  placeholder="Or paste image URL" className={cn(inputClass)} />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className={labelClass}>Display Order</label>
                <input type="number" value={form.displayOrder}
                  onChange={(e) => setForm((prev) => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))}
                  className={cn(inputClass, "mt-1.5")} />
              </div>
              <button type="button" onClick={() => setForm((prev) => ({ ...prev, featured: !prev.featured }))}
                className={cn("flex items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-all mt-1.5",
                  form.featured ? "border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]" : "border-white/[0.06] text-[#666] hover:bg-white/[0.04]"
                )}>
                <Star className={cn("h-4 w-4", form.featured && "fill-current")} />
                {form.featured ? "Featured" : "Featured"}
              </button>
            </div>

            <button type="submit" disabled={saving}
              className="w-full rounded-xl bg-[#D4AF37] px-4 py-3.5 text-sm font-semibold text-[#050505] disabled:opacity-50">
              {saving ? (
                <span className="inline-flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Saving...</span>
              ) : (
                <span className="inline-flex items-center justify-center gap-2"><Save className="h-4 w-4" /> {editingId ? "Update" : "Create"}</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-lg mx-auto px-3 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Our Works</h1>
            <p className="text-xs text-[#888]">Ractysh Group portfolio</p>
          </div>
          <button onClick={startNew}
            className="flex items-center gap-1.5 rounded-xl bg-[#D4AF37] px-4 py-2.5 text-sm font-semibold text-[#050505] shadow-lg shadow-[#D4AF37]/20">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#555]" />
          <input type="text" value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWorks()}
            placeholder="Search projects..."
            className={cn(inputClass, "pl-10")} />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">{error}</div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
                <div className="h-16 w-20 rounded-lg bg-white/[0.06]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-36 rounded bg-white/[0.06]" />
                  <div className="h-3 w-20 rounded bg-white/[0.04]" />
                  <div className="flex gap-2 mt-2">
                    <div className="h-7 w-7 rounded-lg bg-white/[0.04]" />
                    <div className="h-7 w-7 rounded-lg bg-white/[0.04]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : works.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]">
              <FolderKanban className="h-7 w-7 text-[#444]" />
            </div>
            <p className="text-base font-medium text-[#888]">No projects yet</p>
            <p className="text-sm text-[#555] mt-1">Add your first portfolio project.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {works.map((work) => (
                <ProjectCard
                  key={work.id || work._id}
                  work={work}
                  onEdit={() => startEdit(work)}
                  onDelete={() => handleDelete(work.id || work._id!)}
                  onToggleFeatured={() => toggleFeatured(work)}
                  deleting={deleting === (work.id || work._id)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
