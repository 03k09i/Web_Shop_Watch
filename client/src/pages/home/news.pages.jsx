import React, { Component } from "react";

class News extends Component {
    render() {
        return (
            <div className="home grid" style={{height:800}}>
                <div className="home__news margin">
                    <div className="home-products__header">
                    <span className="header-title">PK Store - Tin tức và khuyến mãi</span>
                    </div>
                    <div className="home-news__list row mt-5 mb-5">
                    <div className="card" style={{width: '25rem'}}>
                        <a href="#">
                        <img src="/assets/img/promote2.jpg" className="card-img-top" alt="..." />
                        </a>
                        <div className="card-body">
                        <div className="card-body__date mt-3">
                            <i className="material-icons">event</i>
                            <span className="home-news__list--size">01/01/2021</span>
                        </div>
                        <p className="card-text home-news__list--size">Some quick example text to build on the card
                            title and make up the bulk
                            of the card's content.</p>
                        </div>
                    </div>
                    <div className="card" style={{width: '25rem'}}>
                        <a href="#">
                        <img src="/assets/img/promote3.jpg" className="card-img-top" alt="..." />
                        </a>
                        <div className="card-body">
                        <div className="card-body__date mt-3">
                            <i className="material-icons">event</i>
                            <span className="home-news__list--size">01/01/2021</span>
                        </div>
                        <p className="card-text home-news__list--size">Some quick example text to build on the card
                            title and make up the bulk
                            of the card's content.</p>
                        </div>
                    </div>
                    <div className="card" style={{width: '25rem'}}>
                        <a href="#">
                        <img src="/assets/img/promote4.jpg" className="card-img-top" alt="..." />
                        </a>
                        <div className="card-body">
                        <div className="card-body__date mt-3">
                            <i className="material-icons">event</i>
                            <span className="home-news__list--size">01/01/2021</span>
                        </div>
                        <p className="card-text home-news__list--size">Some quick example text to build on the card
                            title and make up the bulk
                            of the card's content.</p>
                        </div>
                    </div>
                    <div className="card" style={{width: '25rem'}}>
                        <a href="#">
                        <img src="/assets/img/promote1.jpg" className="card-img-top" alt="..." />
                        </a>
                        <div className="card-body">
                        <div className="card-body__date mt-3">
                            <i className="material-icons">event</i>
                            <span className="home-news__list--size">01/01/2021</span>
                        </div>
                        <p className="card-text home-news__list--size">Some quick example text to build on the card
                            title and make up the bulk
                            of the card's content.</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default News;
