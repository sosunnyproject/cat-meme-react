
import { CatItem } from './Item';

export function Favorites({ favorites }) {

	const isEmpty = favorites.length ? false : true;
	const showFavorites = favorites.map(cat => <CatItem img={cat} key={cat} />)
	const showGuideline = "하트를 눌러 마음에 드는 고양이 사진을 저장하세요. Click Heart button to save your favorite cats";

	return (
		<ul className="favorites">
			{isEmpty ? showGuideline : showFavorites}
		</ul>
	)
};