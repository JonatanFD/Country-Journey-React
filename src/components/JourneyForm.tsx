
export default function JourneyForm() {
  return (
    <section className="absolute top-4 left-4">
        <form>
            <label htmlFor="from">Origen:</label>
            <input type="text" id="from" name="from" />

            <label htmlFor="to">Destino:</label>
            <input type="text" id="to" name="to" />

            <label htmlFor="filters">Países:</label>
            <input type="text" id="filters" name="filters" />

            <button type="submit">Search</button>
        </form>


    </section>
  )
}
