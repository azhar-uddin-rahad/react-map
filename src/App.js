import { hover } from "@testing-library/user-event/dist/hover";

import { useState } from "react";
import { Annotation, ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Tooltip as ReactTooltip } from 'react-tooltip'
function App() {
  const [content,setContent]=useState();
  const [info,setInfo]=useState();
  const geoUrl= "features.json"
  
  const markers =[
    {
      markerOffset: -15,
      name: 'Sau Paulo',
      coordinates:[-58.3816,-34.6037],
      data : 40
    },
    {
      markerOffset: -15,
      name: 'Melbourne',
      coordinates:[144.963058, -37.813629],
      data : 80
    },
    {
      markerOffset: 25,
      name: 'Dhaka',
      coordinates:[90.412521,23.810331],
      data : 100
    },
    {
      markerOffset: 25,
      name: 'San Francisco',
      coordinates:[-122.419418,37.774929],
      data : 150
    },
    {
      markerOffset: 25,
      name: 'India',
      coordinates:[72.8777,19.0760],
      data : 150
    },
  ]
   
  const handleClick=(name,data)=>{
    console.log(name,data)
    setInfo({name,data})
  }

  return (
    <div 
    style={{
      width:"100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems:"center",
      backgroundColor:"#005880"
    }}
    >
      <h1>Lets build some cool maps</h1>
      <ReactTooltip style={{height:"30px",color:"#fff",fontSize: "30px", marginBottom:"5px"}}>{content}</ReactTooltip>  
      <div style={{width :"1400px", borderStyle: "double"}}>
      <ComposableMap data-tip="" style={{width :"1400px", borderStyle: "double"}}>
     <ZoomableGroup zoom={1}>
      {" "}
     <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} onMouseEnter={()=>{
              const {name}= geo.properties;
              setContent(`${name}`);
              
            }}
            onMouseLeave={
              ()=>setContent( "")
            }
            fill="#48b2dc"
            style={{
              
              hover:{
                fill:"#F53",
                outline:"none" ,
                
              }}}
            />
          ))
        }
      </Geographies>
      {
      markers.map(({name,coordinates,markerOffset,data})=>(
        <Marker key={name} coordinates={coordinates}>
          <circle r={data/10} onClick={()=>handleClick(name,data)} fill='red' stroke="#fff" strokeWidth={2}/>
        <text 
        textAnchor="middle" 
         y={markerOffset} 
         style={{fontFamily:'system-ui',fill:'#5D5A6D'}}  stroke="white">
          {name}
        </text>
         
        </Marker>
      ))}
      <Annotation
       subject={[2.3522,48.8566]}
       dx={-90}
       dy={-30}
       connectorProps={{
         stroke: '#FF5933',
         strokeWidth:3,
         strokeLinecap: 'round'
       }}
       
      >

        <text
       x={8}
       textAnchor='end'
       alignmentBaseline="middle"
       fill="#F53"
       
       >
         {'paris'}

       </text>
       

      </Annotation>
     </ZoomableGroup>

      </ComposableMap>
      </div>
       <h1 style={{color:"#fff",fontSize: "50px"}}>{info?.name}</h1>
       <h1 style={{color:"#fff",fontSize: "50px"}}>{info?.data}</h1>
    </div>
  );
}

export default App;
