import { SiteHeader } from "@/components/site-header";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {

  return ( 
    <div className="h-full relative">
      <SiteHeader />
      <div className="flex-1">{children}</div>
    </div>
   );
}
 
export default DashboardLayout;