function gameResults(props) {
	return (
	<table>
		<thead>
			<tr>
				<th>Turns:</th>
				<th>Minutes:</th>
				<th>Seconds:</th>
			</tr>
		</thead>
		<tbody>
		{props.results.map((result, key) => 
			<tr key={key}>
				<td>{result.turn}</td>
				<td>{result.minute}</td>
				<td>{result.second}</td>
			</tr>
		)
		}
		</tbody>
	</table>
	)
}

export default gameResults;