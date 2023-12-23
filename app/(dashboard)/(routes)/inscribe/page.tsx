import { Separator } from "@/components/ui/separator"
import { DeployForm } from "./components/deploy-form"


export default function InscribePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Deploy</h3>
        <p className="text-sm text-muted-foreground">
          Deploy protocols.
        </p>
      </div>
      <Separator />
      <DeployForm />
    </div>
  )
}
