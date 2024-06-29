// app/problems/[pid]/ProblemClientComponent.tsx

'use client';

import React from 'react';
import Topbar from '../../components/Topbar';
import WorkSpace from '../../components/WorkSpace';
import useHasMounted from '../../hooks/useHasMounted';


interface ProblemClientComponentProps {
  problem: any;
  pid: string
}

const ProblemClientComponent: React.FC<ProblemClientComponentProps> = ({ problem,pid }) => {
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;
    console.log(pid)
  return (
    <div>
      <Topbar problemPage />
      <WorkSpace problem={problem} />
    </div>
  );
};

export default ProblemClientComponent;
