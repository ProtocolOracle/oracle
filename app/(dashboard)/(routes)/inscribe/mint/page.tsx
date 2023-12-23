import { Separator } from "@/components/ui/separator"
import { MintForm } from "../components/mint-form"


export default function MintPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Mint</h3>
        <p className="text-sm text-muted-foreground">
          Mint bones.
        </p>
      </div>
      <Separator />
      <MintForm />
    </div>
  )
}
