import React, { Component } from 'react';
import './prayer-times.css';
import PrayerData from '../prayer-data/prayer-data';

class PrayerTimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayerTimes: this.getPrayerTimes()
    };
  }

  getPrayerTimes() {
    var _data = new PrayerData();
    return _data.getPrayerTimes();
  }

  convertTime(time) {
    let hours = parseInt(time.substring(0, 2));
    let minutes = time.substring(3, 5);
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let convertedTime = hours + ':' + minutes + ' ' + ampm;
    return convertedTime;
  }

  getAsrRows() {
    if (
      this.state.prayerTimes['asr_1_begins'] &&
      !this.state.prayerTimes['asr_2_begins']
    ) {
      return (
        <tr>
          <th>Asr</th>
        </tr>
      );
    } else if (
      this.state.prayerTimes['asr_2_begins'] &&
      !this.state.prayerTimes['asr_1_begins']
    ) {
      return (
        <tr>
          <th>Asr</th>
        </tr>
      );
    } else {
      return [
        <tr key="asr1">
          <th>'Asr</th>
          <td>{this.convertTime(this.state.prayerTimes['asr_1_begins'])}</td>
          <td>{this.convertTime(this.state.prayerTimes['asr_jamaah'])}</td>
        </tr>
      ];
    }
  }

  render() {
    if (!this.state.prayerTimes)
      return (
        <>
          <h1>Loading</h1>
        </>
      );

    var asrRows = this.getAsrRows();

    return (
      <div className="PrayerTimeWrapper">
        <table className="PrayerTimes">
          <thead>
            <tr>
              <th>Fajr</th>
              <th>Zuhr</th>
              <th>Asr</th>
              <th>Maghrib</th>
              <th>Isha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.convertTime(this.state.prayerTimes['fajr_begins'])}</td>
              <td>{this.convertTime(this.state.prayerTimes['zuhr_begins'])}</td>
              <td>
                {this.convertTime(this.state.prayerTimes['asr_1_begins'])}
              </td>
              <td>
                {this.convertTime(this.state.prayerTimes['maghrib_begins'])}
              </td>
              <td>{this.convertTime(this.state.prayerTimes['isha_begins'])}</td>
            </tr>
            <tr>
              <td>{this.convertTime(this.state.prayerTimes['fajr_jamaah'])}</td>
              <td>{this.convertTime(this.state.prayerTimes['zuhr_jamaah'])}</td>
              <td>{this.convertTime(this.state.prayerTimes['asr_jamaah'])}</td>
              <td>
                {this.convertTime(this.state.prayerTimes['maghrib_jamaah'])}
              </td>
              <td>{this.convertTime(this.state.prayerTimes['isha_jamaah'])}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PrayerTimes;
