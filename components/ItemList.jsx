import { useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, VirtualizedList, Alert } from 'react-native';
import Loading from "./Loading";

export default function ItemList(props) {
    const {category_id} = props
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(false)

    const getItems = () => {
        fetch(`https://www.sima-land.ru/api/v3/item?category_id=${category_id}&page=${page}`).then(response => {
            response.json().then(json => {
                const data = json.items.map(i => {
                    return {
                        id: i.id,
                        name: i.name,
                        price: i.price,
                        photo: i.photoUrl
                }})
                setItems(data)
                setLoading(false)
                setPage(page +1)
            }).catch(e => Alert.alert('Ошибка', e))
        }).catch(e => Alert.alert('Ошибка', e))
    }

    const getMoreItems = () => {
        if (!lastPage) {
            setLoading(true)
            fetch(`https://www.sima-land.ru/api/v3/item/?category_id=${category_id}&page=${page}`).then(response => {
                response.json().then(json => {
                    if (json.status == 404) {
                        setLoading(false)
                        setLastPage(true)
                        return 
                    }
                    const data = json.items.map(i => {
                        return {
                            id: i.id,
                            name: i.name,
                            price: i.price,
                            photo: i.photoUrl
                    }})
                    setItems([...items, ...data])
                    setPage(page+1)
                    setLoading(false)
                }).catch(e => Alert.alert('Ошибка', e))
            }).catch(e => Alert.alert('Ошибка', e))
        }
    }

    const getTwoItems = (data, index) => {
        let goods = []
        for (let i = 0; i < 2; i++) {
            const good = data[index*2 + i]
            if(good)
                goods.push(good)
        }
        return goods
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <>
            <VirtualizedList 
                style={styles.virtList}
                data={items}
                getItem={getTwoItems}
                getItemCount={data => data.length }
                onEndReached={getMoreItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index}) => (
                    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        {item.map( el =>
                        <View key={el.id} style={styles.itemView}>
                            <Image style={styles.itemImage} source={{uri: el.photo || 'https://www.un.org/sites/un2.un.org/files/2020/08/faqs.png'}} />
                            <Text style={{textAlign: 'center'}}>{el.name.length > 50? el.name.substring(0, 50) + '...' : el.name}</Text>
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>{el.price} ₽</Text>
                            </View>
                        </View>
                        )}
                    </View>
                )}
            />
            {loading && <Loading/>}
        </>
    )
}

const styles = StyleSheet.create({
    virtList: {
        backgroundColor: '#c8c8c8'
    },
    itemView: {
        width: '47%',
        padding: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        textAlign: 'center',
    },
    itemImage: {
        height: 150,
        width: '100%'
    },
    price: {
        fontWeight: 'bold',
    },
    priceContainer: {
        flexDirection: 'row-reverse',
        width: '100%',
        marginLeft: 10
    }
})
