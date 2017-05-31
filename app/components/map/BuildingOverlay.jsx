import React from 'react'
import getBackgroundImageStyle from '../lib/getBackgroundImageStyle'
import { OverlayView } from 'react-google-maps'

const centerOverlay = (width, height) => {
  return { x: -(width / 2), y: -height - 20 };
}

const getBuildingTitle = (building) => {
  if (building.building_name) {
    return building.building_name;
  } else if (building.address) {
    return building.address;
  } else {
    return 'New Haven Building';
  }
}

const getBuildingImage = (building) => {
  const imageDir = '/assets/uploads/resized/medium/';
  const buildingImage = building.images && building.images.length ?
      imageDir + building.images[0].filename
    : 'http://via.placeholder.com/400x400';
  return getBackgroundImageStyle(buildingImage);
}

export default class BuildingOverlay extends React.Component {
  render() {
    return (
      <OverlayView
        position={{
          lat: this.props.lat,
          lng: this.props.lng
        }}

        // render the marker to a mouse-accessible layer of the map
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}

        // center the marker overlay over the marker
        getPixelPositionOffset={centerOverlay}>

        <div className='marker-overlay'>
          <div className='building-image' style={getBuildingImage(this.props.building)} />
          <h2 className='building-title'>
            {getBuildingTitle(this.props.building)}
          </h2>
        </div>
      </OverlayView>
    )
  }
} 
