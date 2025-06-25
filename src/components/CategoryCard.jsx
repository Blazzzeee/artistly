import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function CategoryCard({ title }) {
  return (
    <Card className="hover:shadow-lg transition-transform hover:-translate-y-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Discover top {title.toLowerCase()} for your event.
        </p>
      </CardContent>
    </Card>
  )
}
