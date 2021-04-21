import './Filter.scss'
import filter from '../../assets/filter.svg' 
import gsap from 'gsap'
import FilterButton from './FilterButton/FilterButton'
import useFilterOption from '../../hooks/useFilterOption'
import { useEffect, useState } from 'react'



export default function Filter(props:any)
{
    const {priceRange, exterior,rarity,floatRange} = useFilterOption()
    const [listFilter, setListFilter] = useState<any>({
        price: [],
        exterior: [],
        rarity:[]
    });

    const filtering = () => {
        let ori = props.data;
        const proper = ['exterior','rarity']
        let result = ori;
        for (let i = 0; i< proper.length;i++)
        {
            if (listFilter[proper[i]].length != 0)
            {
                result = result.filter((data:any) => {
                    for (let j = 0; j < listFilter[proper[i]].length; j++) {
                        if (data[proper[i]] === listFilter[proper[i]][j]) {
                            
                        return true;
                        }
                    }
                    return false;
                });
            }
                
        }
        props.setFilteredItems(result);
   


        /*let result = ori.filter((data:any) => {
          for (let i = 0; i < listFilter.exterior.length; i++) {
            if (data.exterior === listFilter.exterior[i]) {
              return true;
            }
          }
          return false;
        });
        result = ori.filter((data:any) => {
            for (let i = 0; i < listFilter.rarity.length; i++) {
              if (data.rarity === listFilter.rarity[i]) {
                return true;
              }
            }
            return false;
        });

        
        if (result.length == 0) {
          props.setFilteredItems(ori);
        } else {
          console.log("aff:");
          console.log(result);
          props.setFilteredItems(result);
        }*/
    };


    const handleList = (push:any, type:any, status:any) => 
    {
        const handle = (pro: 'exterior' | 'price' | 'rarity') =>
        {
            const a:string[] = [...listFilter[pro]]; //Create an temp array to store list of filter for each properties
            if (status == true) {
                a.push(push); //Add filter to array
                setListFilter({
                ...listFilter,
                [pro]: a
                });
            } else {
                const index = a.indexOf(push);
                if (index > -1) {
                //Remove filter from array
                a.splice(index, 1);
                }
                setListFilter({
                ...listFilter,
                [pro]: a
                });
            }
        }

        switch (type)
        {
            case "EXTERIOR":
                {
                    return handle('exterior')
                }
            case "RARITY":
                {
                    return handle('rarity')
                }
            case "PRICE":
                {
                    return handle('price')
                }
            default:
                return listFilter
        }
    }

    useEffect(()=>{
        console.log(listFilter)
        filtering()
    },[listFilter])

    return(
        <div className="function-cont">
            <div className="function">
                <div className="function-left">
                    <div className="filter-btn" >
                        <img src={filter}/>
                    </div>
                    <div className="search-btn" onClick={(e)=>{
                        gsap.to(e.currentTarget,{
                            width:'150px',
                            duration: 1,
                        })
                        
                    }}>
                    <img src={filter}/>
                    </div>
                </div>

                <div className="function-right">
                    <h2>R</h2>
                </div>
            </div>
            <div className="functionalities">
                <div className="function-line">
                    <h3>Price Range:</h3>
                    {priceRange.map((p,index) => {
                        return <FilterButton key={index} val={p} dispatch={handleList} type={"PRICE"}/>
                    })}
                </div>
                <div className="function-line">
                    <h3>Exterior:</h3>
                    {exterior.map((p,index) => {
                        return <FilterButton key={index} val={p} dispatch={handleList} type={"EXTERIOR"}/>
                    })}
                    <div className="function-line">
                    <h3>Float Range:</h3>
                    {floatRange.map((p,index) => {
                        return <FilterButton key={index} val={p} dispatch={handleList} type={"PRICE"}/>
                    })}
                </div>
                </div>
                <div className="function-line">
                    <h3>Rarity:</h3>
                    {rarity.map((p,index) => {
                        return <FilterButton key={index} val={p} dispatch={handleList} type={"RARITY"}/>
                    })}
                </div>
                
            </div>
            <h1 className="title">Shop</h1>
        </div>
    )
}