import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:1000}});
try{
 await page.goto('http://127.0.0.1:4173');
 const gallery=page.locator('.badge-gallery');await gallery.scrollIntoViewIfNeeded();
 await expect(page.locator('.badge-object')).toHaveCount(5);
 expect(new Set(await page.locator('.badge-identity h3').allTextContents()).size).toBe(5);
 await expect(page.locator("#team")).not.toContainText(/example teammates|role concept|Mika|Sora|Yuki|Rin/);
 expect(new Set(await page.locator(".badge-photo img").evaluateAll(imgs=>imgs.map(img=>img.getAttribute("src")))).size).toBe(5);
 const badge=page.locator('.badge-object').nth(2),rope=page.locator('.rope-body').nth(2);
 const resting=await rope.getAttribute("d");
 await expect.poll(()=>rope.getAttribute("d")).not.toBe(resting);
 await page.getByRole("button",{name:"Pause badge motion",exact:true}).click();
 await badge.scrollIntoViewIfNeeded();
 const before=await rope.getAttribute('d');const box=await badge.boundingBox();
 await page.mouse.move(box.x+box.width*.9,box.y+box.height*.4);
 await expect.poll(()=>rope.getAttribute('d')).not.toBe(before);
 const hover=await badge.getAttribute('style');expect(hover).toContain('translate3d');
 await page.mouse.move(10,10);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('#team').screenshot({path:'artifacts/badges-five-desktop.png'});
 for(const width of [320,390,768,1050,1440]){
  await page.setViewportSize({width,height:900});
  const geometry=await page.locator('.badge-stage').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y}}));
  expect(Math.max(...geometry.map(r=>r.y))-Math.min(...geometry.map(r=>r.y))).toBeLessThan(2);
  expect(geometry.every((r,i)=>!i||r.x>geometry[i-1].x)).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await page.setViewportSize({width:390,height:844});
 await gallery.evaluate(e=>e.scrollLeft=e.scrollWidth);
 await expect(page.locator('.badge-object').last()).toBeInViewport();
 await page.locator('#team').screenshot({path:'artifacts/badges-five-mobile.png'});
 const outside=await page.locator('body').evaluate(e=>{const clone=e.cloneNode(true);clone.querySelector('#rein')?.remove();return clone.textContent});
 expect(outside).not.toMatch(/rein protocol|rein foundation|search rein|rein —/i);
 console.log('PASS: five unique names, hover moves rope, single horizontal row at five widths, last badge reachable on mobile, Rein branding confined to customer section.');
}finally{await browser.close()}
