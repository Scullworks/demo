import { useNestedCollectionsQuery } from '@/hooks/queries';
import { FirebaseBoat } from '@/models';

function BoatContainer() {
    const { data } = useNestedCollectionsQuery('boats');
    const boats = data as unknown as FirebaseBoat[];

    return (
        <>
            <h2>Boats</h2>
            <div className="profile-services__boats-container">
                {boats?.map(boat => (
                    <div className="profile-services__boat" key={boat.id}>
                        <span>
                            {boat.name} &#x2022; {boat.make} &#x2022; {boat.size}
                        </span>
                    </div>
                ))}
            </div>
            <button className="profile-services__button button__static">Add Boat</button>
        </>
    );
}

export default BoatContainer;
