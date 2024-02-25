import './index.css';

import { useEffect, useState } from 'react';

import RestHandler from '../rest/RestHandler';

import TheCharacter, { TCharacter } from "../components/TheCharacter/TheCharacter";
import WithConsumer, { IConsumerProps } from '../wrappers/WithConsumer';

interface ICharacterProps extends IConsumerProps {
    slug?: string
}

const Character = ({ context, slug }: ICharacterProps): JSX.Element => {
    const [character, setCharacter] = useState<TCharacter | null>(null);

    const getCharacter = (slug: string) => {
        context.addLoading();
        let url = '/wp-json/comics/v1/character/' + slug;
        return RestHandler.get(url).then((response) => {
            setCharacter(response.data);
            
        }).catch(() => {
        }).finally(() => {
            context.removeLoading();
        });
    }

    useEffect(() => {
        if (!slug) {
            return;
        }

        getCharacter(slug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    if (!character) {
        return <></>;
    }

    return (
        <div className="character-single container-vertical">
            <TheCharacter character={character} />
        </div>
    )

}
export default WithConsumer(Character);