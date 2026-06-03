import { useState, useEffect } from 'react';
import type { Resume } from '../../../types';
import {
  TemplateModernBlue, TemplateEmerald, TemplateMinimal,
  TemplateATS, TemplateDark, TemplateRose, TemplateViolet,
  TemplateAmber, TemplateCyan, TemplatePink, TemplateNavy
} from './AllTemplates';

export const TEMPLATES_LIST = [
  { id:'modern-blue',   name:'Modern Blue',    free:true,  ats:true,  tag:'Popular', Component: TemplateModernBlue },
  { id:'minimal-clean', name:'Minimal Clean',  free:true,  ats:true,  tag:null,      Component: TemplateMinimal    },
  { id:'ats-classic',   name:'ATS Classic',    free:true,  ats:true,  tag:'ATS ✓',   Component: TemplateATS        },
  { id:'emerald-pro',   name:'Emerald Pro',    free:true,  ats:false, tag:'New',     Component: TemplateEmerald    },
  { id:'slate-dark',    name:'Slate Dark',     free:false, ats:false, tag:'PRO',     Component: TemplateDark       },
  { id:'rose-elegant',  name:'Rose Elegant',   free:false, ats:false, tag:'PRO',     Component: TemplateRose       },
  { id:'violet-bold',   name:'Violet Bold',    free:false, ats:false, tag:'PRO',     Component: TemplateViolet     },
  { id:'amber-warm',    name:'Amber Warm',     free:false, ats:false, tag:'PRO',     Component: TemplateAmber      },
  { id:'tech-modern',   name:'Tech Modern',    free:false, ats:false, tag:'PRO',     Component: TemplateCyan       },
  { id:'creative-pink', name:'Creative Pink',  free:false, ats:false, tag:'PRO',     Component: TemplatePink       },
  { id:'navy-exec',     name:'Navy Executive', free:false, ats:true,  tag:'PRO',     Component: TemplateNavy       },
];

export function TemplateRenderer({ resume }: { resume: Resume }) {
  const [renderCount, setRenderCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  // Force re-render when template changes
  useEffect(() => {
    if (mounted && resume?.template) {
      setRenderCount(prev => prev + 1);
    }
  }, [resume?.template, mounted]);
  
  // Add null check for resume
  if (!resume) {
    return (
      <div className="p-8 text-center text-gray-400">
        Loading template...
      </div>
    );
  }
  
  const found = TEMPLATES_LIST.find(t => t.id === resume.template);
  const Comp = found?.Component || TemplateModernBlue;
  const templateKey = `${resume.template}-${renderCount}`;
  
  return <Comp key={templateKey} resume={resume} />;
}