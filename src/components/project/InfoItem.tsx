interface InfoItemProps  {
    label: string;
    value: string
}

const InfoItem = ({label, value}: InfoItemProps ) => {
  return (
    <> 
        <h3>{label}</h3>
        <p>{value}</p> 
    </>
  )
};

export default InfoItem;
