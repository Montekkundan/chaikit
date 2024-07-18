'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Broswer } from '@/components/browser';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import SidebarRight from '@/components/editor/sidebar-right';
import SidebarLeft from '@/components/editor/sidebar-left';

const FullPageEditor: React.FC = () => {
  const pathname = usePathname();
  const key = pathname.split('/').pop();
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);
  const [siteConfigUrl, setSiteConfigUrl] = useState<string | null>(null);

  useEffect(() => {
    if (key) {
      fetch(`/api/get-deployment-url?key=${key}`)
        .then(response => response.json())
        .then(data => {
          setDeploymentUrl(data.deploymentUrl);
          setSiteConfigUrl(`${data.dir}/${data.siteConfig}`);
        });
    }
  }, [key]);

  if (!deploymentUrl || !siteConfigUrl) {
    return <div>Loading...</div>;
  }

  console.log('deploymentUrl', deploymentUrl, 'siteConfigUrl', siteConfigUrl);

  return (
    <div className="flex h-screen w-full flex-col items-start bg-default-background">
      <div className="flex w-full grow shrink-0 basis-0 flex-wrap items-start mobile:flex-col mobile:flex-wrap mobile:gap-0">
        <SidebarLeft />
        <div className="relative m-2 rounded-md flex grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch bg-neutral-50 overflow-hidden">
          <DotPattern className={cn("absolute inset-0 w-full h-full")} />
          <div className="relative flex flex-col items-center justify-center gap-1">
            <Broswer url={deploymentUrl} />
          </div>
        </div>
        <SidebarRight url={siteConfigUrl} />
      </div>
    </div>
  );
};

export default FullPageEditor;
