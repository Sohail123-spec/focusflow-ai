const WidgetCard = ({
  title,
  value,
  subtext
}) => {

  return(

    <div className="dashboard-card">

      <div className="card-title">

        {title}

      </div>

      <div className="card-value">

        {value}

      </div>

      <div className="card-subtext">

        {subtext}

      </div>

    </div>

  );

};

export default WidgetCard;