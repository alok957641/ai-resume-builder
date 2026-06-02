
import type { Resume } from '../../../types';
import ModernBlue from './ModernBlue';
import EmeraldPro from './EmeraldPro';
import SlateDark from './SlateDark';
import RoseElegant from './RoseElegant';
import VioletBold from './VioletBold';
import AmberWarm from './AmberWarm';
import MinimalClean from './MinimalClean';
import ExecutivePro from './ExecutivePro';
import CreativeSplit from './CreativeSplit';
import TechModern from './TechModern';

// Sab templates ka list
export const TEMPLATES = [
  { id: 'modern-blue',    name: 'Modern Blue',    color: '#3B82F6', free: true  },
  { id: 'emerald-pro',    name: 'Emerald Pro',    color: '#10B981', free: true  },
  { id: 'minimal-clean',  name: 'Minimal Clean',  color: '#6B7280', free: true  },
  { id: 'slate-dark',     name: 'Slate Dark',     color: '#334155', free: false },
  { id: 'rose-elegant',   name: 'Rose Elegant',   color: '#F43F5E', free: false },
  { id: 'violet-bold',    name: 'Violet Bold',    color: '#8B5CF6', free: false },
  { id: 'amber-warm',     name: 'Amber Warm',     color: '#F59E0B', free: false },
  { id: 'executive-pro',  name: 'Executive Pro',  color: '#1E293B', free: false },
  { id: 'creative-split', name: 'Creative Split', color: '#EC4899', free: false },
  { id: 'tech-modern',    name: 'Tech Modern',    color: '#06B6D4', free: false },
];

// Template renderer
export const TemplateRenderer = ({ resume }: { resume: Resume }) => {
  switch (resume.template) {
    case 'modern-blue':    return <ModernBlue resume={resume} />;
    case 'emerald-pro':    return <EmeraldPro resume={resume} />;
    case 'slate-dark':     return <SlateDark resume={resume} />;
    case 'rose-elegant':   return <RoseElegant resume={resume} />;
    case 'violet-bold':    return <VioletBold resume={resume} />;
    case 'amber-warm':     return <AmberWarm resume={resume} />;
    case 'minimal-clean':  return <MinimalClean resume={resume} />;
    case 'executive-pro':  return <ExecutivePro resume={resume} />;
    case 'creative-split': return <CreativeSplit resume={resume} />;
    case 'tech-modern':    return <TechModern resume={resume} />;
    default:               return <ModernBlue resume={resume} />;
  }
};