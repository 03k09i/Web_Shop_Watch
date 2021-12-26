import React, { lazy,useState,useEffect} from 'react'
import {CBadge,CButton,CButtonGroup,CCard,CCardBody,CCardFooter,CCardHeader,CCol,CProgress,CRow,CCallout} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import MainChartExample from './MainChartExample'
import {CChartDoughnut,CChartBar} from '@coreui/react-chartjs'

const Dashboard = () => {
//------------------------------------------------------------Set Dữ liệu---------------------------------------------------------------
//----------------------------Dữ liệu main--------------------------------------------------
    const[total,setTotal]=useState(0)
    const[main ,setMain]=useState([])
    const[allMonth ,setAllMonth]=useState([])
    const[temp ,setTemp]=useState([1, 2])
    const[result, setResult]=useState([1, 2])
    const[revenue, setRevenue]=useState([0,0,0,0,0,0,0,0,0,0,0,0])
    const[t10watch, setT10Watch]=useState([])
    const[tempWatch, setTempWatch]=useState([1, 2])
    const[quantityWatch, setquantityWatch]=useState(0)
    const[salesWatch, setSalesWatch]=useState(0)
    const[ratioBrand, setRatioBrand]=useState([])
    const[tempRatioBrand, setTempRatioBrand]=useState([1, 2])
    const[listbrand, setlistbrand]=useState([])
    const[quantityBrand, setQuantityBrand]=useState([])
    const[listWatchtop10, setListWatchtop10]=useState([])
    const[salesTemp, setSales]=useState(0)
    const[t10user, setT10User]=useState([])
    const[tempUser, setTempUser]=useState([1, 2])
    const[sumtotal, setSumTotal]=useState(0)
    const[listUsertop10, setListUsertop10]=useState([])
    const[salesUser, setSalesUser]=useState([])
    const loadMainData = async () => {
        var d = new Date();
        var month=d.getMonth()
        //---------------------------------
        await fetch(`http://localhost:4080/detail/month/${month}`,{method: "GET",})
            .then(function(res){
                return res.json();
            })
            .then(function(myJson){
                setMain(myJson)
        })
        //----------------------------
        const data2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        main.map((data)=>{
            let day = parseInt(data.TimeOrder.slice(8,10))
            data2[day-1]=data2[day-1]+data.TotalMoney/1000000
        })
        //-------------------------------
        var sum=0;
        for(var i=0;i<31;i++)
        {
            sum=sum+data2[i];
        }
        setTotal(sum);
    };
    useEffect(async()=>{
        if(JSON.stringify(temp) !== JSON.stringify(main))
        {
            await loadMainData(); 
            setTemp(main)
        }
    },[temp]);

    const loadAllmonth = async () => {
        //---------------------------------
        await fetch(`http://localhost:4080/detail/month`,{method: "GET",})
            .then(function(res){
                return res.json();
            })
            .then(function(myJson){
                setAllMonth(myJson)
                console.log(myJson)
        })
        var data3 = [0,0,0,0,0,0,0,0,0,0,0,0];
        allMonth.map((data)=>{
            let day = parseInt(data.mth)
            data3[day-1]=data3[day-1]+data.TotalMoney/1000000
        })
        setRevenue(data3)
    };
    useEffect(async()=>{
        if(JSON.stringify(result) !== JSON.stringify(allMonth))
        {
            await loadAllmonth(); 
            setResult(allMonth)
        }
    },[result]);
    var quantity = 0
    var sales = 0
    const top10watch = async () => {
      //---------------------------------
        await fetch(`http://localhost:4080/detail/top10watch`,{method: "GET",})
            .then(function(res){
                return res.json();
            })
            .then(function(myJson){
                setT10Watch(myJson)
                console.log(myJson)
                console.log(t10watch);
        })
        await t10watch.map((data)=>{
            quantity = quantity + data.Totalsale
            sales = sales + data.Totalsale*data.Price
        })
        await setSalesWatch(sales/1000000)
        setquantityWatch(quantity);
    };
    useEffect(async()=>{
        if(JSON.stringify(tempWatch) !== JSON.stringify(t10watch) || salesWatch !== salesTemp)
        {
            await top10watch(); 
            listTop10Watch(); 
            setTempWatch(t10watch)
            setSales(salesWatch)
        }
    },[tempWatch, salesTemp]);

    const ListBrand = async () => {
        //---------------------------------
        await fetch(`http://localhost:4080/detail/brand`,{method: "GET",})
            .then(function(res){
                return res.json();
            })
            .then(function(myJson){
            setRatioBrand(myJson)
                console.log(myJson)
        })
        var listBrand = []
        var ratioQuantity = []
        ratioBrand.map((data)=>{
            listBrand.push(data.Brand)
            ratioQuantity.push(data.Quantity)
        })
        setlistbrand(listBrand);
        setQuantityBrand(ratioQuantity);
    };
    useEffect(async()=>{
        if(JSON.stringify(tempRatioBrand) !== JSON.stringify(ratioBrand))
        {
            await ListBrand(); 
            setTempRatioBrand(ratioBrand)
        }
    },[tempRatioBrand]);
    const listTop10Watch = () => {
        //---------------------------------
        let value = ''
        if(t10watch.length>0)
        {
        value = t10watch.map((data, index)=>{
            return (<div key={index} className="progress-group mb-4">
                        <div className="progress-group-prepend">
                        <span className="progress-group-text" style={{fontSize:14}} >
                            {data.Name}
                        </span>
                        </div>
                        <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value={(data.Totalsale/quantityWatch)*100} />
                        <CProgress className="progress-xs" color="danger" value={(data.Totalsale*data.Price/salesWatch)/10000} />
                        </div>
                    </div>)
            })
        }
        setListWatchtop10(value);
    };
    const top10user = async () => {
      //---------------------------------
        await fetch(`http://localhost:4080/detail/top10user`,{method: "GET",})
            .then(function(res){
                return res.json();
            })
            .then(function(myJson){
                setT10User(myJson)
                console.log(myJson)
        })
        var totals = 0 
        await t10user.map((data)=>{
            totals = totals + data.total
        })
        setSumTotal(totals)
    };
    useEffect(async()=>{
        if(JSON.stringify(tempUser) !== JSON.stringify(t10user) || sumtotal !== salesUser)
        {
            await top10user(); 
            listTop10User();
            setTempUser(t10user); 
            setSalesUser(sumtotal)
        }
    },[tempUser, salesUser]);
    const listTop10User = () => {
        //---------------------------------
        let value = ''
        if(t10user.length>0)
        {
        value = t10user.map((data, index)=>{
            console.log(sumtotal);
            return (<div key={index} className="progress-group mb-4">
                    <div className="progress-group-header">
                    <CIcon className="progress-group-icon" name="cil-user" />
                    <span className="title">{data.Name}</span>
                    <span className="ml-auto font-weight-bold">{(data.total/sumtotal*100).toFixed(2)}%</span>
                    </div>
                    <div className="progress-group-bars">
                    <CProgress className="progress-xs" color="warning" value={(data.total/sumtotal*100).toFixed(2)} />
                    </div>
                </div>)
            })
        }
        setListUsertop10(value);
    };
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h1 id="traffic" className="card-title mb-0" >Biểu đồ doanh thu</h1>
              <div className="small text-muted">Tháng&nbsp;{new Date().getMonth()+1},&nbsp;{new Date().getFullYear()}</div>
            </CCol>
          </CRow>
          <MainChartExample style={{height: '300px', marginTop: '40px'}}/>
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Tổng doanh thu (tr)</div>
              <strong>{total.toFixed(2)}</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      <CRow style={{fontSize:'1.6rem'}}>
        <CCol>
          <CCard>
            <CCardHeader>
              <h1>Doanh thu: thương hiệu {'&'} theo tháng</h1>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12" md="6" xl="6">
                        <CChartDoughnut
                            datasets={[
                                {
                                backgroundColor: [
                                    '#41B883',
                                    '#E46651',
                                    '#00D8FF',
                                    '#DD1B16',
                                    '#000000',
                                    '#ECFF01',
                                ],
                                data: quantityBrand
                                }
                            ]}
                            labels={listbrand}
                            options={{
                                tooltips: {
                                enabled: true
                                }
                            }}
                        />
                </CCol>
                <CCol xs="12" md="6" xl="6">
                <CChartBar
                    datasets={[
                    {
                        label: 'Doanh thu',
                        backgroundColor: '#f87979',
                        data: revenue
                    }
                    ]}
                    labels="months"
                    options={{
                    tooltips: {
                        enabled: true
                    }
                    }}
                />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow style={{fontSize:'1.6rem'}}>
        <CCol>
          <CCard>
            <CCardHeader>
              <h1>Top sản phẩm {' & '} khách hàng</h1>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="6" xl="6">
                  <CRow>
                    <CCol sm="6">
                      <CCallout color="info">
                        <small className="text-muted" style={{fontSize:'1.8rem'}}>Số lượng</small>
                        <br />
                        <strong className="h4" style={{fontSize:'1.7rem'}}>{quantityWatch}</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="danger">
                        <small className="text-muted" style={{fontSize:'1.8rem'}}>Doanh số (tr)</small>
                        <br />
                        <strong className="h4" style={{fontSize:'1.7rem'}}>{salesWatch.toFixed(2)}</strong>
                      </CCallout>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {listWatchtop10}
                  <div className="legend text-center">
                    <small style={{fontSize:'1.7rem'}}>
                      <sup className="px-1"><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
                      Số lượng
                      &nbsp;
                      <sup className="px-1"><CBadge shape="pill" color="danger">&nbsp;</CBadge></sup>
                      Doanh số
                    </small>
                  </div>
                </CCol>
                <CCol xs="12" md="6" xl="6">

                  <CRow>
                    <CCol sm="6">
                      <CCallout color="warning">
                        <small className="text-muted" style={{fontSize:'1.8rem'}}>Doanh thu (tr)</small>
                        <br />
                        <strong className="h4"  style={{fontSize:'1.7rem'}}>{(sumtotal/1000000).toFixed(2)}</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                    {listUsertop10}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
