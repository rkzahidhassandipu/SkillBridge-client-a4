'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Subject, TutorCategory } from '@/types';
import { Check, Code2, Atom, Database, Globe, FileCode, BookOpen, Plus } from "lucide-react";
import { addTutorCategories } from "@/actions/categories.actions";

// Icon mapper
const getSubjectIcon = (name: string = "") => {
  const n = name.toLowerCase();
  if (n.includes('next')) return <Code2 className="w-5 h-5 text-blue-600" />;
  if (n.includes('react')) return <Atom className="w-5 h-5 text-cyan-500" />;
  if (n.includes('prisma')) return <Database className="w-5 h-5 text-emerald-600" />;
  if (n.includes('design')) return <Globe className="w-5 h-5 text-pink-500" />;
  if (n.includes('html') || n.includes('css')) return <FileCode className="w-5 h-5 text-orange-500" />;
  return <BookOpen className="w-5 h-5 text-slate-400" />;
};

interface SubjectGridProps {
  userId: string;
  data: {
    success?: boolean;
    data: Subject[];
  };
  tutorSubjects: TutorCategory[]; // already added categories
}

export default function SubjectGrid({ userId, data, tutorSubjects }: SubjectGridProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>(
    (data?.data || []).filter(subject => !tutorSubjects.map(ts => ts.categoryId).includes(subject.id))
  );

  // Add single subject to profile
  const handleAddCategory = async (subject: Subject) => {
    setLoadingId(subject.id);
    const res = await addTutorCategories(userId, [subject.id]);
    setLoadingId(null);

    if (!res.success) return alert(res.message);

    // Remove added subject from availableSubjects to hide immediately
    setAvailableSubjects(prev => prev.filter(s => s.id !== subject.id));

    alert(`${subject.name} added to your profile!`);
  };

  return (
    <div className="w-full space-y-6 p-5">
      <div className="flex items-center gap-3">
        <div className="relative flex h-5 w-5 items-center justify-center">
          <div className="absolute h-full w-full rounded bg-emerald-400/20 translate-x-1" />
          <div className="absolute h-full w-full rounded bg-rose-400/20 -translate-x-1 translate-y-1" />
          <div className="z-10 h-3 w-3 rounded-sm bg-blue-500 shadow-sm" />
        </div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">My Subjects</h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {availableSubjects.length > 0 ? (
          availableSubjects.map((subject) => (
            <Card 
              key={subject.id} 
              className="group relative border border-slate-100 bg-slate-50/50 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 rounded-[1.25rem] overflow-hidden"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all">
                <Button 
                  size="icon" 
                  className="h-6 w-6 rounded-full bg-blue-500 hover:bg-blue-600 border-none shadow-md shadow-blue-100"
                  onClick={() => handleAddCategory(subject)}
                  disabled={loadingId === subject.id}
                >
                  {loadingId === subject.id ? "..." : <Plus className="w-3.5 h-3.5 text-white" />}
                </Button>
              </div>

              <CardContent className="flex flex-col items-center justify-center p-5 gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-50 group-hover:border-blue-100 transition-colors">
                  {getSubjectIcon(subject.name)}
                </div>
                
                <div className="text-center space-y-1">
                  <p className="text-[13px] font-bold text-slate-700 capitalize line-clamp-1">
                    {subject.name}
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                    {subject.description ? "Specialized" : "Verified"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-slate-400 text-sm">
            No subjects available to add.
          </div>
        )}
      </div>
    </div>
  );
}
