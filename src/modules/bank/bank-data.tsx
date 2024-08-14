import { ArtifactsItem } from "@/components/artifacts-item"
import { useData } from "@/hooks/use-data"

export function BankData() {
  const { bank } = useData()

  return (
    <div>
      <div className="text-2xl font-semibold mb-3">Bank</div>
      
      <div className="text-xl mb-1">Bank gold</div>
      <div>Gold quantity: {bank.gold?.quantity || '-'}</div>

      <div className="mb-2" />

      <div className="text-xl mb-1">Bank items</div>
      <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(60px,1fr))]">
        {bank.items.map(item => (
          <ArtifactsItem key={item.code} item={item} />
        ))}
      </div>
    </div>
  )
}
