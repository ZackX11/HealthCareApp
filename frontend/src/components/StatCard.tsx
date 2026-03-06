interface Props {
  title: string
  value: number
  icon?: string
}

export default function StatCard({ title, value, icon }: Props) {

  return (

    <div className="card">

      <div className="card-header">

        <span className="card-icon">
          {icon}
        </span>

        <span className="card-title">
          {title}
        </span>

      </div>

      <div className="card-value">
        {value}
      </div>

    </div>

  );
}