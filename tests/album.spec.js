//getAlbum
//getAlbumTracks

import chai,{expect} from 'chai';
import {getAlbum, getAlbumTracks, getAlbums} from '../src/album';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album', ()=>{
    let stubedFetch;
    let promise;
    
    beforeEach(() =>{
        stubedFetch = sinon.stub(global, 'fetch');
        promise = stubedFetch.returnsPromise();
    });
    
    afterEach(() =>{
        stubedFetch.restore();
    });
    
    describe('smoke tests', ()=>{
        
        it('should have getAlbum method', ()=>{
            expect(getAlbum).to.exist;
        });
        
        it('should have getAlbumTracks method', () =>{
            expect(getAlbumTracks).to.exist;
        });
    });
    
    describe('getAlbum', ()=>{
        //verifica se o fetch ocorre
        it('should call fetch method', ()=>{
            const album = getAlbum();
            expect(stubedFetch).to.have.been.calledOnce;
        });
        //verifica se o fetch ocorre com a url desejada
        it('should call fetch with the correct url',()=>{
            const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
            expect(stubedFetch).to.have.been
            .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');
            
            const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
            expect(stubedFetch).to.have.been
            .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
        });
        //verifica se a o dado é recebido pela promisse
        it('should return the correct data from promisse',()=>{
            promise.resolves({album: 'name'});
            const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
            expect(album.resolveValue).to.been.eql({album: 'name'});
        });
    });
    
    describe('getAlbumsTracks',()=>{
        //verifica se o fetch ocorre
        it('should call fetch method', ()=>{
            const album = getAlbumTracks();
            expect(stubedFetch).to.have.been.calledOnce;
        });
        //verifica se o fetch ocorre com a url desejada
        it('should call fetch with the correct url',()=>{
            const album = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
            expect(stubedFetch).to.have.been
            .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');
            
            const album2 = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTk');
            expect(stubedFetch).to.have.been
            .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk/tracks');
        });
        //verifica se a o dado é recebido pela promisse
        it('should return the correct data from promisse',()=>{
            promise.resolves({album: 'name'});
            const album = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
            expect(album.resolveValue).to.been.eql({album: 'name'});
        });
    });
    
    describe('getAlbums', () => {
        it('should call fetch method', () => {
          const albums = getAlbums();
          expect(stubedFetch).to.have.been.calledOnce;
        });
    
        it('should call fetch with the correct URL', () => {
          const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
          expect(stubedFetch).to.have.been
            .calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk');
        });
    
        it('should return the correct data from Promise', () => {
          promise.resolves({ album: 'name'});
          const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
          expect(albums.resolveValue).to.be.eql({ album: 'name'});
        });
    });
});