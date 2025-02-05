function RateCard({title, description, url}) {

    return (
      <>
        <div className = "rate-card">
            <img src={url} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
      </>
    )
  }

export default RateCard