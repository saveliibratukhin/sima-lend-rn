import { useEffect, useState } from "react"
import { StyleSheet, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import ItemList from "./ItemList";
import Loading from "./Loading";

export default function CategoryList({navigation, route, options}) {
    const [loading, setLoading] = useState(true)
    const [isLastCategory, setIsLastCategory] = useState(false)
    const [categories, setCategories] = useState([])

    const {level, path, category_id} = route.params

    const getCategories = () => {
        fetch(`https://www.sima-land.ru/api/v3/category?level=${level + (level !== 1 && '&path=' + path) }` ).then(response => {
            response.json().then(json => {
                const data = json.items.map(c => {
                    return {name: c.name,
                        id: c.id,
                        level: c.level,
                        path: c.path,
                        icon: c.icon
                    }
                })
                data.length === 0? setIsLastCategory(true) : setCategories(data)
                setLoading(false)
            }).catch(e => Alert.alert('Ошибка', e))
        }).catch(e => Alert.alert('Ошибка', e))
    }

    useEffect(() => {
        getCategories()
    }, [])

    return !isLastCategory? (
        <>
        <ScrollView style={styles.scroll}>
            {
                categories.map((c) => {
                    return (<TouchableOpacity 
                        key={c.id} 
                        style={styles.categoryView}
                        onPress={() => {
                            navigation.push('Категории', {
                                level: c.level+1,
                                path: c.path,
                                name: c.name,
                                category_id: c.id
                            })
                        }}
                    >
                        <Image style={styles.categoryLogo} 
                            source={{uri: c.icon || 'https://www.un.org/sites/un2.un.org/files/2020/08/faqs.png'}} 
                        />
                        <Text style={styles.catName}>{c.name}</Text>
                    </TouchableOpacity>)
                })
            }
        </ScrollView>
        {loading && <Loading/>}
        </>
    ) : <ItemList category_id={category_id} />
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '#c8c8c8'
    },
    categoryView: {
        height: 60,
        padding: 10,
        flexDirection:'row',
        backgroundColor: 'white',
        margin: 10,
        marginBottom: -4,
        borderRadius: 5,
        alignItems: 'center'
    },
    categoryLogo: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    catName: {
        fontSize: 13
    }
})