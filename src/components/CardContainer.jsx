import Card from './Card';
import '../styles/CardContainer.css';
import { useState, useEffect } from 'react';
import {shaffle} from '../logic/shaffleArray';
import { orderedArray1to20 } from '../data';
import {checkDistinct} from '../logic/checkUniqueValues';


export default function CardContainer({clickedIds, setClickedIds, record, setRecord}) {
    shaffle(orderedArray1to20);
    const [currentOrder, setCurrentOrder] = useState(collectionOfCards (orderedArray1to20));

    function collectionOfCards (order) {
        let tempArray=[];
        for (let i=0; i<orderedArray1to20.length; i++) {
            tempArray.push(<Card id={order[i]} handleClick={handleClick} key={order[i]} />)
        }
        return tempArray
    };

    function handleClick(id) {
        trackClickedIds(id);
        setTimeout(function(){
            
            reShaffle();
          }, 550);
        animateCardsOnClick();

        
    }
    function reShaffle() {
        shaffle(orderedArray1to20);
        setCurrentOrder(collectionOfCards (orderedArray1to20));
    };
    function trackClickedIds(id) {
        setClickedIds(prevClickedIds => [...prevClickedIds, id]);
    }
    function evaluateEndGame() {
        if (!checkDistinct(clickedIds)) {
            alert('game over');
            setClickedIds([]);
        }
        else {
            if (record<clickedIds.length) {
                setRecord(prevRecord=>prevRecord+=1)
            }
            
        }
    };

    useEffect(() => {
        evaluateEndGame()
    }, [clickedIds]);
    
    function animateCardsOnClick() {
        const cards=document.querySelectorAll('.Card');
        for (let i = 0; i<cards.length; i++) {
            cards[i].classList.add('animate');
            setTimeout(function(){
                cards[i].classList.remove('animate');

              }, 500);
        }
    };

    return (
        <div className="CardContainer">
            {currentOrder}
        </div>
    )
};