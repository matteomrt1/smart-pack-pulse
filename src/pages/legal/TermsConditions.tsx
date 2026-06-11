import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

const COMPANY = {
  name: 'Imballaggi Bustesi sas',
  address: 'Via Guglielmo Pepe, 5, 21052 Busto Arsizio (VA)',
  vat: 'P.IVA / C.F. 00656270121',
  email: 'info@imballaggibustesi.it',
  phone: '0331 628019',
  site: 'www.imballaggibustesi.it',
};

const SECTIONS = [
  { id: 'titolare', label: 'Titolare' },
  { id: 'condizioni-uso', label: 'Condizioni d\'uso' },
  { id: 'contenuti', label: 'Contenuti su questa Applicazione' },
  { id: 'diritti-contenuti', label: 'Diritti sui contenuti' },
  { id: 'risorse-esterne', label: 'Accesso a risorse esterne' },
  { id: 'uso-ammesso', label: 'Uso ammesso' },
  { id: 'responsabilita', label: 'Limitazione di responsabilità e manleva' },
  { id: 'disposizioni', label: 'Disposizioni comuni' },
  { id: 'salvaguardia', label: 'Clausola di salvaguardia' },
  { id: 'legge', label: 'Legge applicabile e foro competente' },
  { id: 'definizioni', label: 'Definizioni e riferimenti legali' },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-32 text-[22px] md:text-[26px] font-normal tracking-tight text-foreground mt-16 mb-5">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[16px] font-medium text-foreground mt-8 mb-3">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[14.5px] leading-[1.75] text-muted-foreground font-light mb-4">{children}</p>;
}

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary mb-4 font-normal">Legale</p>
          <h1 className="text-[36px] md:text-[44px] font-light tracking-tight text-foreground leading-[1.1] mb-6">
            Termini e Condizioni
          </h1>
          <p className="text-[15px] leading-relaxed text-muted-foreground font-light mb-3">
            Termini e Condizioni di <strong className="font-medium text-foreground">{COMPANY.site}</strong>.
            Questi Termini disciplinano in maniera vincolante l'utilizzo di questa Applicazione e qualsiasi altro
            Accordo o rapporto giuridico con il Titolare. Le espressioni con l'iniziale maiuscola sono definite nella
            relativa sezione di questo documento. L'Utente è pregato di leggere attentamente questo documento.
          </p>
          <p className="text-[12px] text-muted-foreground/70 font-light">
            Ultima modifica: 11 giugno 2026 · Questo documento può essere stampato utilizzando il comando di stampa del browser.
          </p>

          {/* Indice */}
          <nav className="mt-12 p-6 rounded-3xl border border-border/60 bg-muted/30">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-normal">Indice</p>
            <ol className="space-y-2 text-[13.5px] font-light">
              {SECTIONS.map((s, i) => (
                <li key={s.id} className="flex gap-3">
                  <span className="text-muted-foreground/60 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <a href={`#${s.id}`} className="text-foreground hover:text-primary transition-colors">{s.label}</a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Da sapere */}
          <H2 id="riassunto">Da sapere a colpo d'occhio</H2>
          <P>
            Si fa presente che determinate disposizioni di questi Termini potrebbero essere solo applicabili ad alcune
            categorie di Utenti. In particolare, alcune disposizioni potrebbero applicarsi solo a Consumatori o solo a
            Utenti che non agiscono come Consumatori (Utenti Commerciali). Tali limitazioni sono sempre menzionate
            esplicitamente in ciascuna clausola interessata. In caso di mancata menzione, le clausole si applicano a
            tutti gli Utenti.
          </P>

          {/* Titolare */}
          <H2 id="titolare">Titolare</H2>
          <P>
            Questa Applicazione è un servizio di:<br /><br />
            <strong className="font-medium text-foreground">{COMPANY.name}</strong><br />
            {COMPANY.address}<br />
            {COMPANY.vat}<br />
            Indirizzo email del Titolare: <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a><br />
            Telefono: <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">{COMPANY.phone}</a>
          </P>

          {/* Condizioni d'uso */}
          <H2 id="condizioni-uso">Condizioni d'uso</H2>
          <P>
            Salvo ove diversamente specificato, le condizioni d'uso di questa Applicazione esposte in questa sezione
            hanno validità generale. Ulteriori condizioni d'uso o d'accesso applicabili in particolari situazioni sono
            espressamente indicate in questo documento.
          </P>
          <P>
            Utilizzando questa Applicazione l'Utente dichiara di soddisfare i seguenti requisiti: non ci sono
            restrizioni riferite agli Utenti rispetto al fatto che essi siano Consumatori o Utenti Commerciali.
          </P>

          {/* Contenuti */}
          <H2 id="contenuti">Contenuti su questa Applicazione</H2>
          <P>
            Salvo ove diversamente specificato o chiaramente riconoscibile, tutti i contenuti disponibili su questa
            Applicazione sono di proprietà di o forniti dal Titolare o dei/dai suoi licenzianti.
          </P>
          <P>
            Il Titolare adotta la massima cura affinché il contenuto disponibile su questa Applicazione non violi la
            normativa applicabile o diritti di terze parti. Tuttavia, non sempre è possibile raggiungere tale risultato.
            In tali casi, senza alcun pregiudizio ai diritti ed alle pretese legalmente esercitabili, gli Utenti sono
            pregati di indirizzare i relativi reclami ai recapiti specificati in questo documento.
          </P>

          {/* Diritti sui contenuti */}
          <H2 id="diritti-contenuti">Diritti sui contenuti di questa Applicazione</H2>
          <P>
            Il Titolare detiene e si riserva espressamente ogni diritto di proprietà intellettuale sui suddetti
            contenuti. Gli Utenti non sono autorizzati ad usare i contenuti in alcun modo che non sia necessario od
            implicito nel corretto utilizzo del Servizio.
          </P>
          <P>
            In particolare, ma senza esclusioni, è fatto divieto agli Utenti di copiare, scaricare, condividere oltre i
            limiti sotto specificati, modificare, tradurre, elaborare, pubblicare, trasmettere, vendere, concedere
            sottolicenze, trasformare, trasferire/alienare a terze parti o creare opere derivate a partire dal
            contenuto disponibile su questa Applicazione, di permettere a terze parti di intraprendere tali attività
            tramite il proprio account Utente o dispositivo, anche a propria insaputa.
          </P>
          <P>
            Ove espressamente indicato su questa Applicazione, l'Utente è autorizzato a scaricare, copiare e/o
            condividere determinati contenuti disponibili su questa Applicazione esclusivamente per scopi personali e
            non commerciali ed a condizione che sia osservata l'attribuzione della paternità dell'opera nonché
            l'indicazione di ogni altra circostanza rilevante richiesta dal Titolare.
          </P>
          <P>Restano ferme le limitazioni ed esclusioni previste dalla normativa sul diritto d'autore.</P>

          {/* Risorse esterne */}
          <H2 id="risorse-esterne">Accesso a risorse esterne</H2>
          <P>
            Tramite questa Applicazione gli Utenti potrebbero avere accesso a risorse fornite da terzi. Gli Utenti
            riconoscono ed accettano che il Titolare non ha alcun controllo su tali risorse e che pertanto non risponde
            del loro contenuto e della loro disponibilità.
          </P>
          <P>
            Le condizioni applicabili alle risorse fornite da terzi, ivi incluse quelle applicabili a eventuali
            concessioni di diritti su contenuti, sono determinate dagli stessi terzi e regolate nei relativi termini e
            condizioni o, in loro assenza, dalla legge.
          </P>

          {/* Uso ammesso */}
          <H2 id="uso-ammesso">Uso ammesso</H2>
          <P>
            Questa Applicazione ed il Servizio possono essere utilizzati solo per gli scopi per i quali sono offerti,
            secondo questi Termini ed ai sensi della legge applicabile.
          </P>
          <P>
            È responsabilità esclusiva dell'Utente di far sì che l'uso di questa Applicazione e/o del Servizio non
            violi la legge, i regolamenti o i diritti di terzi.
          </P>
          <P>
            Pertanto, il Titolare si riserva il diritto di adottare ogni misura idonea a proteggere i propri interessi
            legittimi, ed in particolare di negare all'Utente l'accesso a questa Applicazione o al Servizio, risolvere
            contratti, denunciare ogni attività censurabile svolta tramite questa Applicazione o il Servizio alle
            autorità competenti — p. es. l'autorità giudiziaria o amministrativa — ogniqualvolta l'Utente ponga in
            essere o vi sia il sospetto che ponga in essere:
          </P>
          <ul className="text-[14.5px] leading-[1.8] text-muted-foreground font-light list-disc pl-5 mb-4 space-y-1">
            <li>violazioni di legge, regolamenti e/o dei Termini;</li>
            <li>lesioni di diritti di terzi;</li>
            <li>atti che possono pregiudicare considerevolmente i legittimi interessi del Titolare;</li>
            <li>offese al Titolare o a un terzo.</li>
          </ul>

          {/* Responsabilità */}
          <H2 id="responsabilita">Limitazione di responsabilità e manleva</H2>
          <P>
            Salvo ove diversamente specificato o concordato con gli Utenti, la responsabilità del Titolare per danni
            connessi all'esecuzione dell'Accordo sarà esclusa, limitata e/o ridotta nei limiti massimi consentiti dalla
            legge applicabile.
          </P>

          <H3>Manleva</H3>
          <P>
            L'Utente si impegna a manlevare e tenere indenne il Titolare e i suoi sottoposti, affiliati, funzionari,
            agenti, contitolari del marchio, partner e dipendenti nella misura di legge da qualsivoglia rivendicazione
            o pretesa — compresi, senza alcuna limitazione, oneri e spese legali — avanzata da terzi a causa di o in
            collegamento con comportamenti in violazione dei presenti Termini, di diritti di terzi o di legge, posti in
            essere in collegamento con l'utilizzo del Servizio e addebitabili all'Utente, ai suoi affiliati, funzionari,
            agenti, contitolari del marchio, partner e dipendenti, a titolo di colpa.
          </P>

          <H3>Limitazione della responsabilità per le attività dell'Utente su questa Applicazione</H3>
          <P>
            Salvo ove diversamente specificato e fatte salve le disposizioni di legge applicabili, è esclusa ogni
            pretesa risarcitoria nei confronti del Titolare (o di qualsiasi persona fisica o giuridica che agisca per
            suo conto).
          </P>
          <P>
            Quanto precede non limita la responsabilità del Titolare per morte, danno alla persona o all'integrità
            fisica o mentale, danni derivanti dalla violazione di obblighi contrattuali essenziali, quali gli obblighi
            strettamente necessari al raggiungimento della causa del contratto, e/o ai danni provocati con dolo o colpa
            grave, a condizione che l'utilizzo di questa Applicazione da parte dell'Utente sia stato idoneo e corretto.
          </P>
          <P>
            Salvo che i danni siano stati causati con dolo o colpa grave o incidano sulla vita e/o l'integrità
            personale, fisica o mentale, il Titolare risponde solo nella misura del danno tipico per il tipo di
            contratto e prevedibile al momento della conclusione.
          </P>
          <P>In particolare, nei limiti sopra riportati, il Titolare non si assume alcuna responsabilità per quanto riguarda:</P>
          <ul className="text-[14.5px] leading-[1.8] text-muted-foreground font-light list-disc pl-5 mb-4 space-y-1">
            <li>danni o perdite derivanti da interruzioni o malfunzionamenti di questa Applicazione dovuti a cause di forza maggiore o eventi imprevisti ed imprevedibili e, in ogni caso, indipendenti dalla volontà e fuori dal controllo del Titolare, quali, a mero titolo esemplificativo, guasti o interruzioni delle linee telefoniche o elettriche, della connessione Internet e/o di altri mezzi di trasmissione, inaccessibilità di siti web, scioperi, calamità naturali, virus e attacchi informatici, interruzioni di fornitura dei prodotti, servizi o applicazioni di terzi;</li>
            <li>eventuali perdite che non siano conseguenza diretta di una violazione dei Termini da parte del Titolare;</li>
            <li>eventuali mancati guadagni o altre perdite, anche indirette, che l'Utente potrebbe aver subito (quali, a mero titolo esemplificativo, perdite commerciali, perdita di ricavi, di profitti o risparmi preventivati, perdita di rapporti contrattuali o commerciali, perdita di avviamento o danni alla reputazione).</li>
          </ul>
          <P>
            In deroga a quanto precede, le seguenti limitazioni si applicano a tutti gli Utenti che non agiscono come
            Consumatori: in caso di responsabilità del Titolare, il risarcimento dovuto non può eccedere l'importo
            totale dei pagamenti che sono stati, saranno o potrebbero essere contrattualmente dovuti al Titolare da
            parte dell'Utente per un periodo di 12 mesi o per l'intera durata dell'Accordo, se più breve.
          </P>

          {/* Disposizioni comuni */}
          <H2 id="disposizioni">Disposizioni comuni</H2>

          <H3>Nessuna rinuncia implicita</H3>
          <P>
            Il mancato esercizio di diritti di legge o pretese derivanti da questi Termini da parte del Titolare non
            costituisce rinuncia agli stessi. Nessuna rinuncia può essere considerata definitiva in relazione ad uno
            specifico diritto o a qualsiasi altro diritto.
          </P>

          <H3>Interruzione del Servizio</H3>
          <P>
            Per garantire il miglior livello di servizio possibile, il Titolare si riserva di interrompere il Servizio
            per finalità di manutenzione, aggiornamenti di sistema o per qualsiasi altra modifica, dandone idonea
            notizia agli Utenti.
          </P>
          <P>
            Nei limiti di legge, il Titolare si riserva di sospendere o cessare completamente l'attività del Servizio.
            In caso di cessazione dell'attività del Servizio, il Titolare si adopererà affinché gli Utenti possano
            estrarre i propri dati personali e le informazioni e rispetterà i diritti degli Utenti relativi
            all'utilizzo continuato del prodotto e/o al risarcimento, secondo le disposizioni di legge.
          </P>
          <P>
            Inoltre, il Servizio potrebbe non essere disponibile per cause che si sottraggono al ragionevole controllo
            del Titolare, quali cause di forza maggiore (p. es. malfunzionamenti infrastrutturali, blackout, ecc.).
          </P>

          <H3>Rivendita del Servizio</H3>
          <P>
            Gli Utenti non sono autorizzati a riprodurre, duplicare, copiare, vendere, rivendere o sfruttare questa
            Applicazione o il Servizio in toto o in parte senza previo consenso scritto del Titolare, espresso
            direttamente o attraverso un legittimo programma di rivendite.
          </P>

          <H3>Privacy policy</H3>
          <P>
            Le informazioni sul trattamento dei dati personali sono contenute nella{' '}
            <a href="#/privacy" className="text-primary hover:underline">privacy policy</a> di questa Applicazione.
          </P>

          <H3>Proprietà intellettuale</H3>
          <P>
            Senza pregiudizio ad alcuna previsione più specifica contenuta nei Termini, i diritti di proprietà
            intellettuale ed industriale, quali ad esempio diritti d'autore, marchi, brevetti e modelli relativi a
            questa Applicazione sono detenuti in via esclusiva dal Titolare o dai suoi licenzianti e sono tutelati ai
            sensi della normativa e dei trattati internazionali applicabili alla proprietà intellettuale.
          </P>
          <P>
            Tutti i marchi — denominativi o figurativi — ed ogni altro segno distintivo, ditta, marchio di servizio,
            illustrazione, immagine o logo che appaiono in collegamento con questa Applicazione sono e restano di
            esclusiva proprietà del Titolare o dei suoi licenzianti e sono tutelati ai sensi della normativa e dei
            trattati internazionali applicabili alla proprietà intellettuale.
          </P>

          <H3>Modifiche dei Termini</H3>
          <P>
            Il Titolare si riserva il diritto di modificare i Termini in ogni momento. In tal caso, il Titolare darà
            opportuna notizia delle modifiche agli Utenti. Le modifiche avranno effetto nel rapporto con l'Utente solo
            a partire dal momento comunicato all'Utente.
          </P>
          <P>
            L'utilizzo continuato del Servizio implica l'accettazione dell'Utente dei Termini aggiornati. Se l'Utente
            non desidera accettare le modifiche, deve cessare l'utilizzo del Servizio e può recedere dall'Accordo. La
            versione precedente continua a disciplinare il rapporto fino all'accettazione delle modifiche da parte
            dell'Utente. Tale versione può essere richiesta al Titolare.
          </P>
          <P>
            Se richiesto dalla legge, il Titolare comunicherà in anticipo agli Utenti la data di entrata in vigore dei
            Termini modificati.
          </P>

          <H3>Cessione del contratto</H3>
          <P>
            Il Titolare si riserva il diritto di trasferire, cedere, disporre di, novare o appaltare singoli o tutti i
            diritti e le obbligazioni secondo questi Termini, avendo riguardo per gli interessi legittimi degli Utenti.
            Si applicano le disposizioni relative alla modifica di questi Termini.
          </P>
          <P>
            L'Utente non è autorizzato a cedere o trasferire i propri diritti e le proprie obbligazioni secondo i
            Termini senza il consenso scritto del Titolare.
          </P>

          <H3>Contatti</H3>
          <P>
            Tutte le comunicazioni inerenti all'uso di questa Applicazione devono essere inviate ai recapiti indicati
            in questo documento.
          </P>

          {/* Salvaguardia */}
          <H2 id="salvaguardia">Clausola di salvaguardia</H2>
          <P>
            Qualora alcuna delle disposizioni di questi Termini dovesse essere o divenire nulla o inefficace ai sensi
            della legge applicabile, la nullità o inefficacia di tale disposizione non provoca inefficacia delle
            restanti previsioni, che permangono pertanto valide ed efficaci.
          </P>
          <H3>Utenti europei</H3>
          <P>
            Qualora una disposizione di questi Termini dovesse essere o divenire nulla, invalida o inefficace, le parti
            si adopereranno per individuare in via amichevole una disposizione valida ed efficace sostitutiva di quella
            nulla, invalida o inefficace. In caso di mancato accordo nei termini predetti, se permesso o previsto dalla
            legge applicabile, la disposizione nulla, invalida o inefficace sarà sostituita dalla disciplina legale
            applicabile.
          </P>
          <P>
            Fermo restando quanto sopra, la nullità, invalidità o inefficacia di una specifica disposizione di questi
            Termini non comporta nullità dell'intero Accordo, a meno che le disposizioni nulle, invalide o inefficaci
            nel quadro dell'Accordo siano essenziali o di tale importanza, che le parti non avrebbero concluso il
            contratto se avessero saputo che la disposizione sarebbe stata invalida, ovvero in casi in cui le
            disposizioni residue comporterebbero un onere eccessivo ed inaccettabile per una delle parti.
          </P>

          {/* Legge applicabile */}
          <H2 id="legge">Legge applicabile e foro competente</H2>
          <P>
            I Termini sono disciplinati dalla legge italiana, luogo in cui è stabilito il Titolare, a prescindere dalle
            norme di conflitto.
          </P>
          <H3>Prevalenza della legge nazionale</H3>
          <P>
            Tuttavia, a prescindere da quanto precede, se la legge del paese in cui si trova l'Utente prevede un
            livello di tutela dei consumatori superiore, prevale tale superiore livello di tutela.
          </P>
          <H3>Foro competente</H3>
          <P>
            La competenza esclusiva a conoscere qualsiasi controversia derivante da o in collegamento con i Termini
            spetta al giudice del luogo in cui il Titolare è stabilito, ossia il Foro di Busto Arsizio (VA), Italia.
          </P>
          <H3>Eccezione per Consumatori in Europa</H3>
          <P>
            Quanto precede non si applica a Utenti che agiscono come Consumatori Europei o Consumatori situati nel
            Regno Unito, Svizzera, Norvegia o Islanda, per i quali resta fermo il foro inderogabile previsto dalla
            normativa applicabile.
          </P>

          {/* Definizioni */}
          <H2 id="definizioni">Definizioni e riferimenti legali</H2>
          <H3>Questa Applicazione</H3>
          <P>La struttura che consente la fornitura del Servizio.</P>
          <H3>Accordo</H3>
          <P>Qualsiasi rapporto legalmente vincolante o contrattuale tra il Titolare e l'Utente disciplinato dai Termini.</P>
          <H3>Utente Commerciale</H3>
          <P>Qualsiasi Utente che non corrisponde alla definizione di Consumatore.</P>
          <H3>Europeo (o Europa)</H3>
          <P>Si applica quando l'Utente, a prescindere dalla nazionalità, si trova nell'Unione Europea.</P>
          <H3>Titolare (o Noi)</H3>
          <P>
            Indica la persona fisica o giuridica che fornisce questa Applicazione e/o offre il Servizio agli Utenti, ossia
            {' '}{COMPANY.name}.
          </P>
          <H3>Servizio</H3>
          <P>Il servizio offerto tramite questa Applicazione così come descritto nei Termini e su questa Applicazione.</P>
          <H3>Termini</H3>
          <P>
            Tutte le condizioni applicabili all'utilizzo di questa Applicazione e/o alla fornitura del Servizio così
            come descritti in questo documento nonché in qualsiasi altro documento o accordo ad esso collegato, nella
            versione rispettivamente più aggiornata.
          </P>
          <H3>Utente (o Tu)</H3>
          <P>Indica qualsiasi persona fisica che utilizzi questa Applicazione.</P>
          <H3>Consumatore</H3>
          <P>Vale come Consumatore qualsiasi Utente considerato tale ai sensi della legge applicabile.</P>

          <div className="mt-16 pt-8 border-t border-border/50">
            <p className="text-[12px] text-muted-foreground/70 font-light">
              Ultima modifica: 11 giugno 2026
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
