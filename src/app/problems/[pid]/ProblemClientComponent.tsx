// app/problems/[pid]/ProblemClientComponent.tsx

'use client';

import React from 'react';
import Topbar from '../../components/Topbar';
import WorkSpace from '../../components/WorkSpace';
import useHasMounted from '../../hooks/useHasMounted';

interface ProblemClientComponentProps {
  problem: any;
}

const ProblemClientComponent: React.FC<ProblemClientComponentProps> = ({ problem }) => {
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  return (
    <div>
      <Topbar problemPage />
      <WorkSpace problem={problem} />
    </div>
  );
};

export default ProblemClientComponent;
