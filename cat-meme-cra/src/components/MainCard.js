
export const MainCard = ({ img, onHeartClick, isFavorite, loading }) => {
	const EMPTY_HEART = "🤍";
	const FULL_HEART = "💖";
	const heartIcon = isFavorite ? FULL_HEART : EMPTY_HEART
	const noCat = (
		<div className="loading">
			loading
		</div>
	)
	const viewCat = (
		<div>
			<img
				src={img}
				alt="cat"
				width="400"
			/>
			<button
				onClick={onHeartClick}
			>
				{heartIcon}
			</button>
		</div>
	)

	return (
		<div className="main-card">
			{loading ? noCat : viewCat}
		</div>
	)
}
