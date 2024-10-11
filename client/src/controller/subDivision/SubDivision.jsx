import React from 'react'

export default function SubDivision() {
    const [resource, setResource] = useState(0);

    const handleChange = (e) => {
      setResource(e.target.value);
    };
  
    const handleSubmit = () => {
      // Handle resource adjustment submission
      console.log('Resource adjusted to:', resource);
    };
  return (
    <section className="resource-adjustment">
      <h2>Resource Adjustment</h2>
      <p>Manually adjust resources for the subdivision.</p>
      <input
        type="number"
        value={resource}
        onChange={handleChange}
        placeholder="Enter resource amount"
      />
      <button onClick={handleSubmit}>Adjust Resource</button>
    </section>
  )
}
