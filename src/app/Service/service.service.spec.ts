import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Way } from '../model/way';
import { ServiceService } from './service.service';


describe('Service way', () => {

  let httpTestingController: HttpTestingController;
  let service: ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ServiceService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('test get list ways', () => {
    it('returned Observable should match the right data', () => {
      const dummyListWays: Way[] = [];
      dummyListWays.push(
        {
          viaId: 3257,
          viaType: 'Carretera Principal',
          viaClass: 'Calle',
          viaNumber: 12,
          viaCongestion: 33.0
      },
      {
          viaId: 3260,
          viaType: 'Carretera Principal',
          viaClass: 'Calle',
          viaNumber: 15,
          viaCongestion: 2.0
      });

      service.getWay().subscribe(ways => {
        expect(ways.length).toEqual(2);
        expect(ways).toEqual(dummyListWays);
      });

      const request = httpTestingController.expectOne(
        'http://localhost:8080/via/showListOfVias'
      );
      expect(request.request.method).toBe('GET');
      request.flush(dummyListWays);

    });
  });

  describe('test findById way', () => {

    it('returned way find by id 3260 from api via get', () => {

      const wayId = 3260;
      const dummyListWays: Way[] = [];
      dummyListWays.push(
        {
          viaId: 3257,
          viaType: 'Carretera Principal',
          viaClass: 'Calle',
          viaNumber: 12,
          viaCongestion: 33.0
      },
      {
          viaId: 3260,
          viaType: 'Carretera Principal',
          viaClass: 'Calle',
          viaNumber: 15,
          viaCongestion: 2.0
      });

      service.getWayById(wayId).subscribe(wayData => {
        expect(wayData).toEqual(dummyListWays[1]);
      });

      const request = httpTestingController.expectOne(
        'http://localhost:8080/via/findViaById/' + wayId);
      expect(request.request.method).toBe('GET');
      request.flush(dummyListWays[1]);
    });

  });
  describe('test update way', () => {

    it('returned Observable with resquest of update', () => {

      const wayData: Way = {
          viaId: 3257,
          viaType: 'Carretera Principal',
          viaClass: 'Calle',
          viaNumber: 12,
          viaCongestion: 33.0
      };

      service.updateWay(wayData).subscribe(response => {    
        console.log(response)    
        expect(wayData).toEqual(response);

      });

      const request = httpTestingController.expectOne(
        'http://localhost:8080/via/updateVia'
      );

      expect(request.request.method).toBe('PUT');

      request.flush(wayData);

    });

  });

  describe('test delete way', () => {

    it('returned observable with request delete', () => {

      const wayId = 5230;

      service.deleteWay(wayId).subscribe(res => {
        expect(JSON.stringify(res)).toEqual('5230');
      });

      const request = httpTestingController.expectOne(
        'http://localhost:8080/via/deleteVia/5230'
      );

      expect(request.request.method).toBe('DELETE');

      request.flush(wayId);

    });

  });

  describe('test save way', () => {
    it('returned observable with request post', () => {
      const wayData: Way = {
        viaId: 3257,
        viaType: 'Carretera Principal',
        viaClass: 'Calle',
        viaNumber: 12,
        viaCongestion: 33.0
    };

      service.createWay(wayData).subscribe(res => {
        console.log(wayData);
        console.log(res);
        expect(wayData).toEqual(res);
      });

      const request = httpTestingController.expectOne(
        'http://localhost:8080/via/insertVia'
      );

      expect(request.request.method).toBe('POST');

      request.flush(wayData);

    });
  });

});
